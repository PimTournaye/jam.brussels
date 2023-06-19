import { supabaseClient } from '$lib/supabase';
import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
    date: z.date(),
    startTime: z.string(),
    endTime: z.string(),
    location: z.string(),
    title: z.string(),
    openings_band: z.string(),
    description: z.string(),
    file: z.string(),
});

let userID: string;


export const load: PageServerLoad = async (event) => {
    // Check if user is logged in and authenticated
    const { session } = await event.parent();
    if (!session) throw redirect(303, '/login');

    const form = await superValidate(schema)
    // Get the user ID from the session

    userID = session.user.id;

    return { form }
};

export const actions: Actions = {
    create: async ({ request }) => {
        // Validate form
        const form = await superValidate(request, schema);

        console.log('POST', form);

        // Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		//Insert the validated data into supabase
        const {error} = await supabaseClient.from('jams').insert({
            date: form.data.date,
            startTime: form.data.startTime,
            endTime: form.data.endTime,
            location: form.data.location,
            title: form.data.title,
            description: form.data.description,
            file: form.data.file,
            organizer: userID,
        }).single();

        if (error) {
            return fail(500, { form });
        }

		// Yep, return { form } here too
		return { form };
    },
};