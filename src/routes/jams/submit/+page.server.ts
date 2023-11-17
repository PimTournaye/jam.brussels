import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';
import {  fullJamSchema } from '$lib/schemas';
import { put } from "@vercel/blob";
import { addJamSession } from '$lib/server/prisma';


export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const form = await superValidate(fullJamSchema);

	return { form }
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
	const formData = await request.formData();
		// Check if the form is valid
	console.log("Checking if form is valid");	

	const form = await superValidate(formData, fullJamSchema);
	if (!form.valid) return message(form, "Some of the event details are invalid. Please check the form.", { status: 400 });

	console.log("Form is valid, starting image processing");
	
	// FILE STUFF
	const file = formData.get('file');
	console.log(file, typeof file);
	if (!(file instanceof File)) {
		console.log("File is not a file");
		return message(form, "Something is wrong with the picture you uploaded. Please check the form", { status: 400 });
	}
	// Convert the image to a AVIF file
	const buffer = await file.arrayBuffer();
	// send the image to the serverless function
	const avif = await fetch('/api/serverless', {
		method: 'POST',
		body: buffer
	});
	// convert the image to a blob
	const blob = await avif.blob();
	// Upload the image to Vercel Blob Storage
	const { url } = await put(`${form.data.title} - ${form.data.date}.avif`, blob, { access: "public" });
	// Update the form with the image URL
	form.data.image = url;
	// Get the user's session to get their ID for the author field
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');
	const author = session.user.id;

	// POST the form to the database with Prisma
	const data = {
		date: form.data.date, 
		startTime: form.data.startTime, 
		endTime: form.data.endTime, 
		location: form.data.location, 
		title: form.data.title, 
		openingBand: form.data.openingBand, 
		description: form.data.description, 
		image: form.data.image,
		author: {
			connect: {
				id: author
			}
		}
	}

	const response = await addJamSession(data);
	console.log(response);



	return message(form, "Event submitted successfully!");
	}
};
