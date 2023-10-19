import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
// routes/signup/+page.server.ts
import { auth } from "$lib/server/lucia";

// Validation schema for form data
import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});


export const load: PageServerLoad = async () => {
	// Different schemas, so no id required.
  const loginForm = await superValidate(loginSchema);
  const registerForm = await superValidate(registerSchema);

  // Return them both
  return { loginForm, registerForm };
};

export const actions: Actions = {
	login: async ({ request }) => {
		console.log("login action");
		
		const loginForm = await superValidate(request, loginSchema);

    if (!loginForm.valid) return fail(400, { loginForm });

    try {
      const user = await auth.createUser({
        key: {
          providerId: 'email',
          providerUserId: loginForm.data.email.toLowerCase(),
          password: loginForm.data.password,
        },
        attributes: {
          email: loginForm.data.email.toLowerCase(),
          email_verified: Number(false)
        }
      })
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      });
      locals.auth.session = session;
      
    } catch (error) {
      console.log(error);
      return message(loginForm, 'Something went wrong creating the account', { status:  });
    }
    return message(loginForm, 'Login form submitted');
	},

	register: async ({ request }) => {
    const registerForm = await superValidate(request, registerSchema);

    if (!registerForm.valid) return fail(400, { registerForm });

    // TODO: Register user
    return message(registerForm, 'Register form submitted');
  }
};