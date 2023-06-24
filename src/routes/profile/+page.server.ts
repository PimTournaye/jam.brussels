import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { superValidate } from 'sveltekit-superforms/server';
import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { z } from "zod";

const schema = z.object({
	username: z.string(),
});

// export const load: PageServerLoad = async (event) => {
// 	const { supabaseClient, session } = await getSupabase(event);
// 	if (!session) throw redirect(303, "/login");
// 	const {data, error} = await supabaseClient.from('profiles').select('id, username').single();

// 	const form = await superValidate(data, schema);
// 	if (error) return fail(400, {form});

// 	return { form, disable: true };
// };

export const load: PageServerLoad = async () => {
	return { disable: true };
};

// export const actions: Actions = {
// 	default: async (event) => {
// 		const form = await superValidate(event.request, schema);
// 		const { supabaseClient, session } = await getSupabase(event);

// 		if (!session) throw redirect(303, "/login");

// 		// Convenient validation check:
// 		if (!form.valid) {
// 			// Again, always return { form } and things will just work.
// 			return fail(400, { form });
// 		}

// 		const {error} = await supabaseClient.from('profiles').update({username: form.data.username}).match({id: session.user.id});

// 		if (error) return fail(400, {form});

// 		return { form };
// 	}
// };