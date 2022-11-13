import { checkUpcomingDate, matchDateToToday } from '$lib/utils/DateChecking';
import { jamSessions } from '$lib/utils/testCards';

export const todayJams = jamSessions.filter((event) => matchDateToToday(event.date as Date));
export const upcomingJams = jamSessions.filter((event) => checkUpcomingDate(event.date as Date));

export const load = async () => {
	return {
		status: 200,
		todayJams: todayJams,
		upcomingJams: upcomingJams
	};
};
