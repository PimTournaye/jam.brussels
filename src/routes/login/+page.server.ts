import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { AuthApiError, type Provider } from '@supabase/supabase-js';

export const load: PageServerLoad = async (event) => {
	const { session } = await event.parent();
	if (session) throw redirect(303, '/');
};

const OAUTH_PROVIDERS = ['google'] as const;

export const actions: Actions = {
	login: async ({ request, locals, url }) => {
		const provider = url.searchParams.get('provider') as Provider;

		if (provider) {
			if (!OAUTH_PROVIDERS.includes(provider)) {
				return fail(400, {
					message: 'Invalid provider'
				});
			}
			
			const {data, error: err} = await locals.sb.auth.signInWithOAuth({provider: provider});

			if (err) {
				return fail(400, {
					message: 'Something went wrong. Please try again later.'
				})
			}
			throw redirect(303, data.url);
		}


		const body = Object.fromEntries(await request.formData());
		const { data, error: err } = await locals.sb.auth.signInWithOtp({
			email: body.email as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid email address'
				});
			}

			return fail(500, {
				error: 'Internal server error. Please try again later.'
			});
		}

		throw redirect(303, '/');
	}
};
