import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
// routes/signup/+page.server.ts
import { auth } from "$lib/server/lucia";

// Validation schema for form data
import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
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
	login: async ({ request }) => {
    const registerForm = await superValidate(request, registerSchema);

    if (!registerForm.valid) return fail(400, { registerForm });

    // TODO: Register user
    return message(registerForm, 'Register form submitted');
  },

  register: async ({ request, locals }) => {
		console.log("login action");
		// Validate the form data
		const loginForm = await superValidate(request, loginSchema);
    if (!loginForm.valid) return fail(400, { loginForm });

    try {
      // Create the user
      const user = await auth.createUser({
        key: {
          providerId: 'email',
          providerUserId: loginForm.data.email.toLowerCase(),
          password: loginForm.data.password,
        },
        attributes: {
          email: loginForm.data.email.toLowerCase(),
        }
      })
      // Create the session so the user is logged in
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      });
      // Store the session in the session storage
      locals.auth.setSession(session)
    } catch (error) {
      // Check for database errors
      if (error instanceof PrismaClientKnownRequestError) {
        return message(loginForm, `Error: ${error.code}, ${error.meta} ${error.message}`, { status: 409 });
      }
      // Catch all other errors
      return message(loginForm, 'Something went wrong creating the account', { status: 500 });
    }
    return message(loginForm, 'Login form submitted');
	},
};