import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

// Validation schema for form data
import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';

// Authentication
import { auth } from "$lib/server/lucia";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LuciaError } from 'lucia';

// Validation schema for form data
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const load: PageServerLoad = async ({ locals }) => {
  // If the user is already logged in, redirect them to the home page
  const session = await locals.auth.validate();
  if (session) throw redirect(302, "/");

  // Different schemas, so no id required.
  const loginForm = await superValidate(loginSchema);
  const registerForm = await superValidate(registerSchema);

  // Return them both
  return { loginForm, registerForm };
};

export const actions: Actions = {
  login: async ({ request, locals }) => {
    // Validate the form data
    const loginForm = await superValidate(request, registerSchema);
    if (!loginForm.valid) return message(loginForm, 'Invalid form data', { status: 400 });

    try {
      const key = await auth.useKey(
        'email',
        loginForm.data.email.toLowerCase(),
        loginForm.data.password,
      );
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {},
      });
      locals.auth.setSession(session); // set session cookie
      return message(loginForm, 'Register form submitted');
    } catch (error) {
      if (error instanceof LuciaError &&
        (error.message === "AUTH_INVALID_KEY_ID" || error.message === "AUTH_INVALID_PASSWORD")) {
        // user does not exist or invalid password
        return message(loginForm, "Invalid email or password", { status: 401 });
      }
    }
    throw redirect(302, "/");
  },

  register: async ({ request, locals }) => {
    console.log("register action");
    // Validate the form data
    const registerForm = await superValidate(request, registerSchema);
    if (!registerForm.valid) return fail(400, { registerForm });
    console.log("register form valid");

    const email = registerForm.data.email;
    const password = registerForm.data.password;

    try {
      // Create the user
      const user = await auth.createUser({
        key: {
          providerId: 'email',
          providerUserId: email.toLowerCase(),
          password
        },
        attributes: {
          email: email,
        }
      })
      // Create the session so the user is logged in
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      });
      // Store the session in the session storage
      locals.auth.setSession(session);
    } catch (error) {
      console.log("error", error);
      // Check for database errors
      if (error instanceof PrismaClientKnownRequestError) {
        console.log("prisma error", error);
        return message(registerForm, `Error: ${error.code}, ${error.meta} ${error.message}`, { status: 409 });
      }
      // Catch all other errors
      return message(registerForm, 'Something went wrong creating the account', { status: 500 });
    }
    throw redirect(302, "/");
  },
};