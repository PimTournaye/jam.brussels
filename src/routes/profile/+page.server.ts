import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/login");

	return {
		status: 200,
		body: {
			profile: {
				id: session.userId,
				email: session.attributes.email,
			},
		},
	};
}

