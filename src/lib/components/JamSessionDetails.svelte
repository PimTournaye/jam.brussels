<script lang="ts">
	import { formatFullDate } from '$lib/utils/DateFormatting';
	import Icon from '@iconify/svelte';
	// Public data
	export let title: string;
	export let image: string;
	export let openingBand: string;
	export let location: string;
	export let date: Date;
	export let startTime: string;
	export let endTime: string;

	// Private data
	export let isOrganiser: boolean = false;
	export let saved: boolean = false;
	export let userID: string | null = null;
	export let jamID: number | null = null;
</script>

<section id="first">
	<div class="flex flex-row">
		<div class="top-line flex-none" />
		<h1 class="callout-top mx-auto grow">{title}</h1>
	</div>
	<img src={image} alt="Picture for {title} jam session" />
	<ul>
		<h1 class="title">Details</h1>

		<li class="list">
			<div class="line" />
			<span class="icon"><Icon icon="lucide:music" class="h-6 w-6" /></span>
			<span class="icon-text">{openingBand}</span>
		</li>

		<li class="list">
			<div class="line" />
			<span class="icon"><Icon icon="lucide:map-pin" class="h-6 w-6" /></span>
			<span class="icon-text">{location}</span>
		</li>

		<li class="justify-between">
			<div class="list items-center">
				<div class="line" />
				<span class="icon"><Icon icon="lucide:calendar" class="h-6 w-6" /></span>
				<span class="icon-text">{formatFullDate(date)}</span>
			</div>
			{#if isOrganiser}
				<div class="list items-center">
					<span class="text-cararra-900 italic mr-1.5">Edit</span>
					<button
					class="icon icon-save"
					on:click|preventDefault={() => console.log('Edit jam session')}
					>
					<Icon icon="lucide:pen-square" class="h-6 w-6" />
				</button>
				<div class="line-right" />
			</div>
			{/if}
			
			
		</li>

		<li class="justify-between">
			<div class="list items-center">
				<div class="line" />
				<span class="icon"><Icon icon="lucide:clock" class="h-6 w-6" /></span>
				<span class="icon-text">{startTime} to {endTime}</span>
			</div>
			<!-- {#if !session}
				<div class="list items-center">
					<span class="text-cararra-900 italic mr-1.5">Save</span>
					<button
						class="icon icon-save"
						on:click|preventDefault={() => console.log('Save jam session')}
					>
						<Icon src={Heart} theme={saved ? 'solid' : ''} class="h-6 w-6" />
					</button>
					<div class="line-right" />
				</div>
			{/if} -->
		</li>
	</ul>
</section>

<style lang="postcss">
	#first {
		display: flex;
		flex-direction: column;
		margin-top: 3rem;
		border-left: 2px solid #df3f1f;
	}

	.callout-top {
		z-index: 2;

		@apply text-log-cabin p-4 mx-4;
		border-radius: 1rem;
		font-size: 2rem;
		font-weight: 900;
		text-align: center;
		line-height: 2rem;

		background-color: #df3f1f;

		transform: translate(0, -2rem);
	}

	.top-line {
		position: absolute;
		width: 2rem;
		height: 2px;
		background: #df3f1f;
	}

	.title {
		@apply text-cararra text-2xl font-medium;
	}

	ul {
		@apply flex flex-col gap-1.5;
		transform: translateY(1rem);
	}
	ul h1 {
		@apply ml-6 text-2xl font-medium;
	}

	ul li {
		@apply flex flex-row items-center;
	}

	ul .line {
		@apply w-6 bg-cinnabar h-[2px];
	}

	ul .line-right {
		@apply w-6 bg-tulip-tree h-[2px];
	}

	ul .icon {
		@apply rounded-full border-2 border-cinnabar 
      p-1;
	}

	ul .icon-save {
		@apply border-tulip-tree;
	}

	ul .icon-text {
		@apply ml-2 font-light text-cararra;
	}

	ul .list {
		@apply flex flex-row;
	}
</style>
