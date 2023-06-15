import type { PageServerLoad } from './$types';
import { generateTestJams } from '$lib/utils/generateData';
import { checkIfDateIsToday, checkIfDateIsUpcoming } from '$lib/utils/DateChecking';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load: PageServerLoad = async (event) => {
	const { supabaseClient, session } = await getSupabase(event);

	const { data, error } = await supabaseClient.from('profiles').select('id, username').single();

	const todayJams: {
		uuid: string;
		date: Date;
		title: string;
		startTime: string;
		endTime: string;
		location: string;
		openingBand: string;
		organiser: string;
		image: string;
	}[] = [];
	const upcomingJams: {
		uuid: string;
		date: Date;
		title: string;
		startTime: string;
		endTime: string;
		location: string;
		openingBand: string;
		organiser: string;
		image: string;
	}[] = [];

	const test = false;

	if (test) {
		const jams = generateTestJams();
		jams.forEach((jam) => {
			if (checkIfDateIsToday(jam.date)) todayJams.push(jam);
			else if (checkIfDateIsUpcoming(jam.date)) upcomingJams.push(jam);
		});
	}

	return {
		todayJams: todayJams,
		upcomingJams: upcomingJams,
		profile: data
	};
};
