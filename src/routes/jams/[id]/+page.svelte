<script lang="ts">
	import type { PageData } from './$types';
	import Section from '$lib/form/Section.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Clock, Calendar, MapPin, MusicalNote } from '@steeze-ui/heroicons';
	import { formatFullDate } from '$lib/utils/DateFormatting';
	import { faker } from '@faker-js/faker';

	export let data: PageData;

	// let {title, image, openingBand, location, date, startTime, endTime, description} = data;

	const image = '/2023-06-02-wayne-escoffery-quartet-2-the-sounds-mix-session-swing--1683394778.png',
		title = 'Muntpunt Sessions',
		openingBand = 'Wayne Escoffery Quartet',
		location = 'Muntpunt',
		date = new Date('2023-06-02'),
		startTime = '20:00',
		endTime = '22:00',
		description = faker.lorem.paragraphs(3);
</script>

<section>
	<div class="line" />
	<h1 class="callout w-full mx-4">{title}</h1>
	<img src={image} alt="Picture for {title} jam session" />

	<h1>Details</h1>
	<ul>
		<li class="list">
			<span class="icon"><Icon src={MusicalNote} theme="solid" class="h-6 w-6" /></span>
			<span class="icon-text">{openingBand}</span>
		</li>
		<li class="list">
			<span class="icon"><Icon src={MapPin} theme="solid" class="h-6 w-6" /></span>
			<span class="icon-text">{location}</span>
		</li>
		<li class="list">
			<span class="icon"><Icon src={Calendar} theme="solid" class="h-6 w-6" /></span>
			<span class="icon-text">{formatFullDate(date)}</span>
		</li>
		<li class="list">
			<span class="icon"><Icon src={Clock} theme="solid" class="h-6 w-6" /></span>
			<span class="icon-text">{startTime} to {endTime}</span>
		</li>
	</ul>
</section>

<section>
	<h1>Description</h1>
	<div>
		<p class="description">
			{description}
		</p>
	</div>
</section>

<style lang="scss">
  $red: #DF3F1F;

	section {
		position: relative;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;

		width: 500px;
		padding-right: 2rem;
		margin-top: 3rem;

		border-left: 2px solid $red;
	}

	.callout {
		position: relative;
		z-index: 2;

		width: 100%;
		max-width: 88%;
		padding: 1rem;
		margin-left: 1rem;

		@apply text-log-cabin;
		border-radius: 1rem;

		font-size: 2rem;
		font-weight: 900;
		text-align: center;
		line-height: 2rem;

    position: absolute;
		background: $red;

		transform: translate(0, -2rem);

	}

	.line {
		position: absolute;
		width: 2rem;
		height: 2px;
		background: $red;
	}

  .icon {
    @apply rounded-full border-2 border-cinnabar 
    p-1
  }

  .icon-text {
    @apply ml-2;
    transform: translateY(6px);
  }

  .list {
    @apply flex flex-row 


  }

</style>
