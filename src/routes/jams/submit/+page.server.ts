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
	file: z.any()
});

let userID: string;

async function compressImage(inputBuffer: Buffer) {
	return await sharp(inputBuffer)
		.resize({ width: 800 }) // Resize image to desired dimensions
		.webp({ quality: 80 }) // Convert to webp format and set quality
		.toBuffer(); // Convert the processed image back to a buffer
}

export const load: PageServerLoad = async (event) => {
	// Check if user is logged in and authenticated
	const { session } = await event.parent();
	if (!session) throw redirect(303, '/login');
  
	userID = session.user.id;

	const form = await superValidate(event, schema);
	return { form };
};

export const actions: Actions = {
	default: async ({ request, locals: {session} }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, schema);

		// Convenient validation check:
		if (!form.valid) return fail(400, { form });

		const file = formData.get('file');
		if (!(file instanceof File)) return fail(400, { form });

		// Compress the uploaded file to a smaller size and webp format
		const fileBuffer = Buffer.from(await file.arrayBuffer());
		const compressedImageBuffer = await compressImage(fileBuffer);

		// Upload Buffer to supabase storage
		const { data: imageData, error: imageError } = await supabaseClient.storage
			.from('jams')
			.upload(`${userID}/${file.name}`, compressedImageBuffer.buffer, {
				cacheControl: '3600',
				upsert: false
			});

		if (imageError) {
      console.log('uploadError', imageError);
      return fail(500, { form });
    }
    console.log('data from storage', imageData);
    
		//Insert the validated data into supabase
		const insert = await supabaseClient
			.from('jam_sessions')
			.insert({
				date: form.data.date,
				startTime: form.data.startTime,
				endTime: form.data.endTime,
				location: form.data.location,
				title: form.data.title,
				description: form.data.description,
				file: imageData.Key,
				organizer: userID
			})
			.single();
		if (insert.error) return fail(500, { form });
    console.log('insert', insert, insert.data);
    

		return { form };
	}
};
