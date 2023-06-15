import { supabaseClient } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({params}) => {
    // Get the particular jam from the Supabase table using the id

    // If the authenticated user is the owner of the jam, add the edit button

    // const {data, error} = await supabaseClient.from('jams').select('*').match({uuid: params.id}).single();


    return {};
};