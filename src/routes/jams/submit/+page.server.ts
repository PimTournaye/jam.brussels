import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    const { session } = await event.parent();
    if (!session) throw redirect(303, '/login')
};