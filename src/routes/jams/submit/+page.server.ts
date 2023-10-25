import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';
import { detailsSchema, contentSchema, fullJamSchema } from '$lib/schemas';



export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	// const detailsForm = await superValidate(detailsSchema);
	// const contentForm = await superValidate(contentSchema);
	// return {detailsForm, contentForm};

	const form = await superValidate(fullJamSchema);

	return { form };
};

export const actions: Actions = {
	confirm: async ({ request }) => {
		console.log("Confirming event submission");
		
		// const detailsForm = await superValidate(request, detailsSchema);
		// // If not valid, superValidate will throw an error
		// if (!detailsForm.valid) return message(detailsForm, "Some of the event details are invalid. Please check the first step of the form.");

		// const contentForm = await superValidate(request, contentSchema);
		// // If not valid, superValidate will throw an error
		// if (!contentForm.valid) return message(contentForm, "Some of the event content is invalid. Please check the second step of the form.");

		// console.log("Details form", detailsForm);
		// console.log("Content form", contentForm);

		const form = await superValidate(request, fullJamSchema);
		// If not valid, superValidate will throw an error
		if (!form.valid) return message(form, "Some of the event details are invalid. Please check the form.");

		console.log("Form", form);
		
	}
};
