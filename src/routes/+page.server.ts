import { checkIfDateIsToday, checkIfDateIsUpcoming } from '$lib/utils/DateChecking';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const jamSessions = false

	if (!jamSessions) throw error(404, 'Jam sessions not found');
	else {
	
	// filter the jam sessions into two arrays, one for today and one for the comign two weeks
	const todayJams = [];
	const upcomingJams = [];
	// for (const jam of jamSessions) {
	// 		if (checkIfDateIsToday(jam.date)) {
	// 			todayJams.push(jam);
	// 		} else if (checkIfDateIsUpcoming(jam.date)) {
	// 			upcomingJams.push(jam);
	// 		}
	// 	}

	return {
		todayJams,
		upcomingJams
	};
}
};
