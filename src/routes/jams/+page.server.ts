import { supabaseClient } from '$lib/supabase';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

	// get all jams from database
	const {data, error} = await supabaseClient.from('jams').select('*');

	return {
		body: {
			jams: data
		}
	};
};
