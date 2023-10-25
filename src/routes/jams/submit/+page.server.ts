import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import sharp from 'sharp';

// async function compressImage(inputBuffer: Buffer) {
// 	return await sharp(inputBuffer)
// 		.resize({ width: 800 }) // Resize image to desired dimensions
// 		.webp({ quality: 80 }) // Convert to webp format and set quality
// 		.toBuffer(); // Convert the processed image back to a buffer
// }

export const load: PageServerLoad = async ({ request, locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');
};

export const actions: Actions = {
	confirm: async ({ request }) => {
		console.log('confirm action');
		
	}
};
