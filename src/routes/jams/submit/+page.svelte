<script lang="ts">
	import type { PageData } from './$types';
	import Section from '$lib/form/Section.svelte';
	import { Clock, Calendar, MapPin, MusicalNote, Pencil } from '@steeze-ui/heroicons';
	import { superForm } from 'sveltekit-superforms/client';

	
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;
	const { form, errors, constraints, enhance } = superForm(data.form);
	
</script>

<SuperDebug data={$form} />

<form method="POST" use:enhance enctype="multipart/form-data">
	<div id="main" class="mx-1">
		<div class="flex flex-row items-center -translate-y-7 w-full text-center">
			<div class="line" />
			<h1
				class="grow rounded-lg p-4
		font-bold text-2xl
		bg-cinnabar text-log-cabin"
			>
				Adding a new jam session
			</h1>
		</div>
		<p class="description mb-4 -translate-y-7">
			Please fill in the necessary information to submit a new jam session. Once submitted, it will
			appear in the list of upcoming jams.
		</p>

		<div class="sections">
			<Section title={'Date'} description={'When is the jam taking place?'}>
				<div class="flex flex-row align-middle">
					<Icon src={Calendar} class="inline-block w-7 h-7 mt-1" />
					<input
						aria-invalid={$errors.date ? 'true' : undefined}
						bind:value={$form.date}
						{...$constraints.date}
						type="date"
						name="date"
						id="date"
						class=""
						autocomplete="off"
						required
					/>
					{#if $errors.date}<small class="invalid text-red-500 text-sm">{$errors.date}</small>{/if}
				</div>
			</Section>

			<Section
				title={'Time'}
				description={'At what time does the jam session start? This includes the time when the opening band starts.'}
			>
				<div class="flex flex-row gap-4 align-middle">
					<Icon src={Clock} class="inline-block w-7 h-7 mt-1" />
					<input
						aria-invalid={$errors.startTime ? 'true' : undefined}
						bind:value={$form.startTime}
						{...$constraints.startTime}
						required
						type="time"
						name="startTime"
						id="startTime"
						class="time"
						autocomplete="off"
					/>
					<p class="mt-2">to</p>
					<input
						aria-invalid={$errors.endTime ? 'true' : undefined}
						bind:value={$form.endTime}
						{...$constraints.endTime}
						required
						type="time"
						name="endTime"
						id="endTime"
						class="time"
						autocomplete="off"
					/>
				</div>
				{#if $errors.startTime || $errors.endTime}
					<p class="text-red-500 text-sm mt-2">
						{#if $errors.startTime}
							{$errors.startTime}
						{:else if $errors.endTime}
							{$errors.endTime}
						{/if}
					</p>
				{/if}
			</Section>

			<Section
				title={'Location'}
				description={'Where is the jam session taking place? If there are some additional directions, place mention those in the description further below.'}
			>
				<div class="flex flex-row align-middle">
					<Icon src={MapPin} class="inline-block w-7 h-7 mt-1 " />
					<input
						aria-invalid={$errors.location ? 'true' : undefined}
						bind:value={$form.location}
						{...$constraints.location}
						required
						type="text"
						name="location"
						id="location"
						autocomplete="off"
					/>
					{#if $errors.location}<small class="invalid text-red-500 text-sm"
							>{$errors.location}</small
						>{/if}
				</div>
			</Section>

			<Section
				title={'Opening band'}
				description={'What group or band is opening the jam? Please us a group name and list the band members in the description further below.'}
			>
				<div class="flex flex-row align-middle">
					<Icon src={MusicalNote} class="inline-block w-7 h-7 mt-1.5" />
					<input
						aria-invalid={$errors.openings_band ? 'true' : undefined}
						bind:value={$form.openings_band}
						{...$constraints.openings_band}
						required
						type="text"
						name="openings_band"
						id="openings_band"
						autocomplete="off"
						class="ml-2 w-full"
					/>
					{#if $errors.openings_band}<small class="invalid text-red-500 text-sm"
							>{$errors.openings_band}</small
						>{/if}
				</div>
			</Section>

			<Section title="Jam name" description="Please give your event / jam session a name.">
				<div class="flex flex-row align-middle">
					<Icon src={Pencil} class="inline-block w-7 h-7 mt-1.5 flex-none" />
					<input
						aria-invalid={$errors.title ? 'true' : undefined}
						bind:value={$form.title}
						{...$constraints.title}
						required
						type="text"
						name="title"
						id="title"
						class="grow"
						autocomplete="off"
					/>
					{#if $errors.title}<small class="invalid text-red-500 text-sm">{$errors.title}</small
						>{/if}
				</div>
			</Section>

			<Section
				title="Description"
				description={'Please provide an additional details relating to the jam session below.'}
			>
				<textarea
					required
					name="description"
					id="description"
					cols="30"
					rows="10"
					placeholder="this this that, this bandmember, another bandmember..."
					autocomplete="off"
					style="white-space: pre-wrap;"
					bind:value={$form.description}
					{...$constraints.description}
				/>
				{#if $errors.description}<small class="invalid text-red-500 text-sm"
						>{$errors.description}</small
					>{/if}
			</Section>

			<Section
				title="Picture"
				description={`Upload a picture or banner for the jam session. This will be displayed on the website.`}
			>
				<div class="flex items-center justify-center w-full">
					<label
						for="file"
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
								<span class="font-semibold">Tap to upload</span>
							</p>
							<p class="text-xs text-gray-500 dark:text-gray-400">WEBP (Max. 1920x1080)</p>
						</div>
						<input
							required
							id="file"
							name="file"
							type="file"
							class="hidden"
							accept=".png, .jpg, .webp"
							bind:value={$form.file} {...$constraints.file}
						/>
						{#if $errors.file}<small class="invalid text-red-500 text-sm">{$errors.file}</small
							>{/if}
					</label>
				</div>
			</Section>
			<Section title={"That's it!"} description={''} />
		</div>
	</div>
	<div class="ml-11 mr-2 mb-4 mt-4">
		Press the button below to submit the jam session to the database.
	</div>
	<button
		type="submit"
		class="bg-cararra mx-auto text-log-cabin text-center font-medium text-xl px-2 rounded-lg h-12 w-full mb-2"
		>Add a new jam session</button
	>
</form>

<style lang="postcss">
	:root {
		--red: #df3f1f;
	}
	#main {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;

		margin-top: 2rem;

		border-left: 2px solid var(--red);
		border-radius: 4px;
	}

	#title,
	#location,
	#location {
		width: 100%;
		max-width: 88%;
		padding: 1rem;
		margin-left: 0.5rem;
	}

	#date {
		margin-left: 1rem;
		padding: 1rem;
	}

	.description {
		padding-left: 1rem;
		margin: auto;
	}

	.line {
		width: 1rem;
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
		@apply font-light text-base;
		border-radius: 14px;
		@apply px-2;
	}

	textarea {
		width: 100%;
		height: 300px;
		border: 1px solid var(--red);
		@apply bg-cararra text-log-cabin dark:bg-log-cabin dark:text-cararra;
		border-radius: 14px;
		padding: 10px;
	}
</style>
