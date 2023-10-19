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

async function compressImage(inputBuffer: Buffer) {
	return await sharp(inputBuffer)
		.resize({ width: 800 }) // Resize image to desired dimensions
		.webp({ quality: 80 }) // Convert to webp format and set quality
		.toBuffer(); // Convert the processed image back to a buffer
}

export const load: PageServerLoad = async (event) => {
	const form = await superValidate(event, schema);
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, schema);

		// Convenient validation check:
		if (!form.valid) return fail(400, { form });

		const file = formData.get('file');
		if (!(file instanceof File)) return fail(400, { form });

		// Compress the uploaded file to a smaller size and webp format
		const fileBuffer = Buffer.from(await file.arrayBuffer());
		const compressedImageBuffer = await compressImage(fileBuffer);


		return { form };
	}
};
