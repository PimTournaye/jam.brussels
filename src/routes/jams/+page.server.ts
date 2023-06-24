import { supabaseClient } from '$lib/supabase';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { session } = await event.parent();
	console.log(session);
	
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


const avatarFile = new File(['static/2023-06-02-wayne-escoffery-quartet-2-the-sounds-mix-session-swing--1683394778.png'], 'test.png', { type: 'image/png' })
const { data, error } = await supabaseClient
  .storage
  .from('jams')
  .upload('test/test', avatarFile, {
    cacheControl: '3600',
    upsert: false
  })

	// log error
	if (error) {
		console.error(error);
	}

	// log data
	if (data) {
		console.log(data);
	}
