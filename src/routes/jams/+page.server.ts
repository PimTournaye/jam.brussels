import { supabaseClient } from '$lib/supabase';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// get all jams from database
	const { data, error } = await supabaseClient
		.from('jams')
		.select('*')
		// select from today onwards
		.lt('date', new Date())
		// until 6 months from now
		.gt('date', new Date(new Date().setMonth(new Date().getMonth() + 6)));

	return {
		body: {
			jams: data
		}
	};
};
