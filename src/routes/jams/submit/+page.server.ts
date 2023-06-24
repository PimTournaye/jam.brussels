import { supabaseClient } from '$lib/supabase';
import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import sharp from 'sharp';


const schema = z.object({
    date: z.date(),
    startTime: z.string(),
    endTime: z.string(),
    location: z.string(),
    title: z.string(),
    openings_band: z.string(),
    description: z.string(),
    file: z.instanceof(Buffer)
});

let userID: string;

const compressImage = async (inputBuffer) => {
    try {
        const compressedBuffer = await sharp(inputBuffer)
        .resize({ width: 1920, height: 1080, fit: 'inside' })
        .webp({ quality: 80 })
        .toBuffer();
        return compressedBuffer;
    } catch (error) {   
        console.error(error);
        return null;
    }
  };

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
    default: async ({ request }) => {
        // Validate form
        const form = await superValidate(request, schema);

        console.log('POST', form);

        // Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

        // Check if file is valid
        if (!form.data.file) {
            return fail(400, { form });
        }
        // Compress the uploaded file to a smaller size and webp format
        const compressedImageBuffer = await compressImage(form.data.file);
        // Upload file to supabase storage
        const { data, error: uploadError } = await supabaseClient.storage
            .from('jams')
            .upload(`${userID}/${form.data.title} - ${Date.now}`, compressedImageBuffer, {
                cacheControl: '3600',
                upsert: false,
            });

        if (uploadError) {
            return fail(500, { form });
        }

		//Insert the validated data into supabase
        const {error} = await supabaseClient.from('jams').insert({
            date: form.data.date,
            startTime: form.data.startTime,
            endTime: form.data.endTime,
            location: form.data.location,
            title: form.data.title,
            description: form.data.description,
            file: data.Key,
            organizer: userID,
        }).single();

        if (error) {
            return fail(500, { form });
        }

		// Yep, return { form } here too
		return { form };
    },
};