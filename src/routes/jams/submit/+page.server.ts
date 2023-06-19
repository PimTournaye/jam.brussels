import type { Actions, PageServerLoad } from './$types';
import { redirect} from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    // Check if user is logged in and authenticated
    const { session } = await event.parent();
    // if (!session) throw redirect(303, '/login')
};

export const actions: Actions = {
    create: async ({ body, context }) => {
        console.log(body);
    },
};