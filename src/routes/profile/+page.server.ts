import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect, error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async (event) => {
	const { supabaseClient, session } = await getSupabase(event);
	if (!session) throw redirect(303, "/login");

	const {data, error} = await supabaseClient.from('profiles').select('id, username').single()
	return { profile: data };
};

export const actions: Actions = {
	default: async (event) => {
		const { supabaseClient, session } = await getSupabase(event);
		if (!session) return error(401, 'You must be logged in to do this.');

		const formData = await event.request.formData();
		const username = formData.get('username');

		if(!username || typeof username !== 'string') return error(400, 'You must specify a username');

		const {error} = await supabaseClient.from('profiles').update({username: username}).match({id: session.user.id});

		if (error) return error(400, 'Was not able to update username.');
	}
};