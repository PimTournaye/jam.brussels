import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    // Check if user is logged in and authenticated
    const { session } = await event.parent();
    // if (!session) throw redirect(303, '/login')


    // Form submission
    if (event.request.method === 'POST') {
        const form = await event.request.formData();
        
        // Check if date is valid
        const date = form.get('date') as string;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            return {
                status: 400,
                body: {
                    error: 'Invalid date'
                }
            };
        }

        // Check if times are valid
        const startTime = form.get('startTime') as string;
        const endTime = form.get('endTime') as string;
        const timeRegex = /^\d{2}:\d{2}$/;
        if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
            return {
                status: 400,
                body: {
                    error: 'Invalid time'
                }
            };
        }

        // Check if location is valid
        const location = form.get('location') as string;
        if (!location) {
            return {
                status: 400,
                body: {
                    error: 'Invalid location'
                }
            };
        }

        // Check if description is valid
        const description = form.get('description') as string;
        if (!description) {
            return {
                status: 400,
                body: {
                    error: 'Invalid description'
                }
            };
        }

        // Check if file is valid
        const file = form.get('file') as File;
        if (!file) {
            return {
                status: 400,
                body: {
                    error: 'Invalid file'
                }
            };
        }

        // rename the file to the id.jpg
        const fileName = `${event.params.id}.jpg`;
        const fileData = file as Blob;

        // upload the file to the bucket
        const { data, error } = await event.supabase.storage
            .from('pictures')
            .upload(fileName, fileData);

        if (error) {
            return {
                status: 500,
                body: {
                    error: 'Internal server error'
                }
            };
        }

        console.log(data);
        return { body: data };
    }
};