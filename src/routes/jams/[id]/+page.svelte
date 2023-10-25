<script lang="ts">
	import type { PageData } from './$types';
	import JamSessionDetails from '$lib/components/jam/JamSessionDetails.svelte';

	export let data: PageData;
	let userID: string | null;
	
	let { session, jamID } = data;

	session ? (userID = session.user.id) : (userID = null);


	// check if user is organiser of this jam session
	let isOrganiser: boolean;
	isOrganiser = false;

	// Check if the user has saved this jam session using Supabase and its user_saved_jam_sessions pivot table
	let saved: boolean;
	saved = false;

	// let {title, image, openingBand, location, date, startTime, endTime, description} = data;

	const image =
			'/2023-06-02-wayne-escoffery-quartet-2-the-sounds-mix-session-swing--1683394778.png',
		title = 'Muntpunt Sessions',
		openingBand = 'Wayne Escoffery Quartet',
		location = 'Muntpunt',
		date = new Date('2023-06-02'),
		startTime = '20:00',
		endTime = '22:00',
		description = faker.lorem.paragraphs(3);
</script>

<JamSessionDetails {title} {image} {openingBand} {location} {date} {startTime} {endTime} {session} {saved} {isOrganiser} {userID} {jamID} />

<section id="desc">
	<h1 class="text-2xl font-medium">Description</h1>
	<div>
		<p class="description">
			{description}
		</p>
	</div>
</section>

<style lang="scss">
	#desc {
		@apply mt-12 mx-6 mb-4 ;

		p {
			@apply text-cararra text-sm font-light mt-1;
		}
	}
</style>
