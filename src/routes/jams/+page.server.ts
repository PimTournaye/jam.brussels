import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const response = await fetch('/api/jams');
	const jams = await response.json();
	return {
		status: response.status,
        body: {
            jams
        }
	};
};
