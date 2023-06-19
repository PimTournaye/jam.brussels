import { supabaseClient } from '$lib/supabase';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({params}) => {
    // Get the particular jam from the Supabase table using the id

    // If the authenticated user is the owner of the jam, add the edit button

    // const {data, error} = await supabaseClient.from('jams').select('*').match({uuid: params.id}).single();


    return {};
};

export const actions: Actions = {
	delete: async (request) => {
		console.log('delete');
		const form = await request.formData();
		const id = form.get('id') as string;

		// Delete jam from database
		const {data, error} = await supabaseClient.from('jams').delete().match({id});
	},

	edit: async (request) => {
		console.log('edit');
	}

};