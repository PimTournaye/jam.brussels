<script lang="ts">
	import type { PageData } from './$types';
	import Section from '$lib/form/Section.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Clock, Calendar, MapPin, MusicalNote, Pencil, ArrowUpTray } from '@steeze-ui/heroicons';

	export let data: PageData;
</script>

<div id="main">
	<div class="line top-line" />
	<h1 class="callout top">Adding a new jam session</h1>
	<p class="description mb-4">
		Please fill in the necessary information to submit a new jam session. Once the information is
		sent, we'll review it quickly so we can put it up.
	</p>

	<div class="sections">
		<Section title={'Date'} description={'When is the jam taking place?'}>
			<Icon src={Calendar} class="inline-block w-8 h-8 mt-1" />
			<input type="date" name="date" id="date" />
		</Section>

		<Section
			title={'Time'}
			description={'At what time does the jam session start? This includes the time when the opening band starts.'}
		>
			<div class="flex flex-row gap-4">
				<Icon src={Clock} class="inline-block w-8 h-8 mt-1" />
				<input type="time" name="startTime" id="startTime" class="time" />
				<p class="mt-2">to</p>
				<input type="time" name="endTime" id="endTime" class="time" />
			</div>
		</Section>

		<Section
			title={'Location'}
			description={'Where is the jam session taking place? If there are some additional directions, place mention those in the description further below.'}
		>
			<div class="flex flex-row">
				<Icon src={MapPin} class="inline-block w-8 h-8 mt-1 " />
				<input type="text" name="location" id="location" />
			</div>
		</Section>

		<Section
			title={'Opening band'}
			description={'What group or band is opening the jam? Please us a group name and list the band members in the description further below.'}
		>
			<div class="flex flex-row">
				<Icon src={MusicalNote} class="inline-block w-8 h-8 mt-1" />
				<input type="text" name="band" id="band" />
			</div>
		</Section>

		<Section title="Jam name" description="Please give your event / jam session a name.">
			<div class="flex flex-row">
				<Icon src={Pencil} class="inline-block w-8 h-8 mt-1 flex-none" />
				<input type="text" name="title" id="title" class="grow" />
			</div>
		</Section>

		<Section
			title="Description"
			description={'Please provide an additional details relating to the jam session below.'}
		>
			<textarea
				name="description"
				id="description"
				cols="30"
				rows="10"
				placeholder="this this that, this bandmember, another bandmember..."
			/>
		</Section>

		<Section
			title="Picture"
			description={`Upload a picture of banner for the jam session. Please make sure it's max 1920 pixels wide or 1080 pixels tall, and preferrably in JPG or WEBP format. If you need to change something, please use something like <a href="https://squoosh.app/" target='_blank' style='text-decoration-line: underline;'>Squoosh</a> to compress the image.`}
		>
			<div class="flex items-center justify-center w-full">
				<label
					for="dropzone-file"
					class="flex flex-col items-center justify-center w-full h-64 border-2 border-cinnabar-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
				>
					<div class="flex flex-col items-center justify-center pt-5 pb-6">
						<svg
							aria-hidden="true"
							class="w-10 h-10 mb-3 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
							/></svg
						>
						<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
							<span class="font-semibold">Click to upload</span> or drag and drop
						</p>
						<p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 1920x1080px)</p>
					</div>
					<input id="file" type="file" class="hidden" />
				</label>
			</div>
		</Section>

		<Section title={"That's it!"} description={''} />
	</div>
</div>
<div class="ml-11 mr-2 mb-4 mt-4">Press the button below to submit the jam session to the database.</div>
<div class="callout callout-bottom bg-cararra mx-auto">Add a new jam session</div>

<style lang="scss">
	:root {
		--red: #df3f1f;
	}
	#main {
		// position: relative;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;

		margin-top: 2rem;
		margin-left: 0.5rem;
		margin-right: 0.5rem;

		border-left: 2px solid var(--red); 
	}

	#title,
	#band,
	#location,
	#location {
		width: 100%;
		max-width: 88%;
		padding: 1rem;
		margin-left: 0.5rem;

		color: black;
		font-size: 1.7rem;
		font-weight: 700;
		text-align: center;
		line-height: 2rem;
	}

	#date {
		margin-left: 1rem;
		padding: 1rem;
	}

	.description {
		padding-top: 3rem;
		padding-left: 1rem;
		margin: auto;
	}

	.callout {
		position: relative;
		z-index: 2;

		width: 100%;
		max-width: 88%;
		padding: 1rem;
		margin-left: 1rem;

		color: black;
		border-radius: 1rem;

		font-size: 1.7rem;
		font-weight: 700;
		text-align: center;
		line-height: 2rem;

		@apply max-[450px]:p-0.5
	}

	.callout-bottom {
		margin-bottom: 1rem;
		margin-left: auto;
	}

	.top {
		position: absolute;
		background: var(--red);

		transform: translate(0, -2rem);
	}

	.line {
		position: absolute;
		width: 2rem;
		height: 2px;
		background: var(--red);
	}

	input[type='time']::-webkit-calendar-picker-indicator {
		display: none;
	}
	input[type='date']::-webkit-calendar-picker-indicator {
		display: none;
	}

	input {
		height: 40px;
		border: 1px solid var(--red);
		@apply bg-cararra text-log-cabin dark:bg-log-cabin dark:text-cararra;
		border-radius: 14px;
		@apply px-2;

		.time {
			width: 40%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;
			text-align: center;
		}
	}

	textarea {
		width: 100%;
		height: 200px;
		border: 1px solid var(--red);
		@apply bg-cararra text-log-cabin dark:bg-log-cabin dark:text-cararra;
		border-radius: 14px;
		padding: 10px;

		::-webkit-resizer {
			background-color: white;
		}
	}
</style>
