<script lang="ts">
	import Icon from '@iconify/svelte';
	import { formatShortDate } from '$lib/utils/DateFormatting';

	export let image: string;
	export let title: string;
	export let date: Date;
	export let startTime: string;
	export let endTime: string;
	export let location: string;
	export let openingBand: string;
	export let color: string;
	export let uuid: string;

	image = 'https://source.unsplash.com/1600x900/?music'
</script>

<a href="/jams/{uuid}">
	<div class="rounded-lg max-h-100 w-full mt-4 mx-1">
		<img class="" src="{image}" alt="Picture of jam at {location}" />
		<h1 class="text-2xl font-bold {color} px-4 py-2 text-log-cabin">{title}</h1>

		<div class="p-4 flex rounded-b-lg bg-cararra">
			<div class="w-1/2">
				<h2 class="text-sm text-log-cabin font-regular mb-2">
					<Icon icon="lucide:map-pin" width="16" height="16" class="inline-block mr-1"/>
					{location}
				</h2>
				<h2 class="text-sm text-log-cabin font-regular">
					<Icon icon="lucide:calendar" width="16" height="16" class="mr-1" />
					{formatShortDate(date)}
				</h2>
			</div>
			<div class="w-1/2">
				<h2 class="text-sm text-log-cabin font-regular mb-2">
					<Icon icon="lucide:music" width="16" height="16" class="mr-1" />
					{openingBand}
				</h2>
				<h2 class="text-sm text-log-cabin font-regular">
					<Icon icon="lucide:clock" width="16" height="16" class="mr-1" />
					{startTime} - {endTime}
				</h2>
			</div>
		</div>
	</div>
</a>