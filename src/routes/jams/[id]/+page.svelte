<script lang="ts">
	import type { PageData } from './$types';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Clock, Calendar, MapPin, MusicalNote, Heart } from '@steeze-ui/heroicons';
	import { formatFullDate } from '$lib/utils/DateFormatting';
	import { faker } from '@faker-js/faker';

	export let data: PageData;

	let { session } = data;

	let saved = false;

	const saveJamSession = () => {
		if (!saved) {
			// if the jam session is not yet saved in the user's list of saved jam sessions, save it
			// Supabase stuff
			saved = true;
		} else {
			// if the jam session is saved in the user's list of saved jam sessions, remove it
			// Supabase stuff
			saved = false;
		}
	};

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

<section id="first">
	<div class="top-line" />
	<h1 class="callout">{title}</h1>
	<img src={image} alt="Picture for {title} jam session" class="mt-12" />
	<ul>
		<h1 class="title mb-1">Details</h1>
		<li class="list">
			<div class="line" />
			<span class="icon"><Icon src={MusicalNote} class="h-6 w-6" /></span>
			<span class="icon-text">{openingBand}</span>
		</li>
		<li class="list">
			<div class="line" />
			<span class="icon"><Icon src={MapPin} class="h-6 w-6" /></span>
			<span class="icon-text">{location}</span>
		</li>
		<li class="list">
			<div class="line" />
			<span class="icon"><Icon src={Calendar} class="h-6 w-6" /></span>
			<span class="icon-text">{formatFullDate(date)}</span>
		</li>
		<li class="justify-between ">
			<div class="list items-center">
				<div class="line" />
				<span class="icon"><Icon src={Clock} class="h-6 w-6" /></span>
				<span class="icon-text">{startTime} to {endTime}</span>
			</div>
			{#if !session}
				<div class="list items-center">
					<span class="text-cararra-900 italic mr-1">Save</span>
					<button class="icon icon-save" on:click={saveJamSession}>
            <Icon src={Heart} theme={saved ? 'solid' : ''} class="h-6 w-6" />
          </button>
					<div class="line-right" />
				</div>
			{/if}
		</li>
	</ul>
</section>

<section id="desc">
	<h1 class="title">Description</h1>
	<div>
		<p class="description">
			{description}
		</p>
	</div>
</section>

<style lang="scss">
	$red: #df3f1f;

	#first {
		display: flex;
		flex-direction: column;
		margin-top: 3rem;
		border-left: 2px solid $red;
	}

	.callout {
		z-index: 2;

		@apply text-log-cabin p-4 max-w-full ml-4;
		border-radius: 1rem;
		font-size: 2rem;
		font-weight: 900;
		text-align: center;
		line-height: 2rem;

		position: absolute;
		background: $red;

		transform: translate(0, -2rem);
	}

	.top-line {
		position: absolute;
		width: 2rem;
		height: 2px;
		background: $red;
	}

	.title {
		@apply text-cararra text-2xl font-medium;
	}

	ul {
		@apply flex flex-col gap-1.5;
		transform: translateY(1rem);

		h1 {
			@apply ml-6 text-2xl font-medium;
		}

		li {
			@apply flex flex-row items-center;
		}

		.line {
			@apply w-6 bg-cinnabar h-[2px];
		}

		.line-right {
			@apply w-6 bg-tulip-tree h-[2px];
		}

		.icon {
			@apply rounded-full border-2 border-cinnabar 
      p-1;
		}

    .icon-save {
      @apply border-tulip-tree;
    }

		.icon-text {
			@apply ml-2 font-light text-cararra;
		}

		.list {
			@apply flex flex-row;
		}
	}

	#desc {
		@apply mt-12 mx-6 mb-4 ;

		p {
			@apply text-cararra text-sm font-light mt-1;
		}
	}
</style>
