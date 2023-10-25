<script lang="ts">
	import type { InputConstraint } from 'sveltekit-superforms';
	import Icon from '@iconify/svelte';

	export let value: any;
	export let label: string;
	export let inputType: string;
	export let icon: string;
	export let description: string;
	export let errors: any  = undefined;
	export let constraints: InputConstraint | undefined = undefined;

	function typeAction(node: HTMLInputElement) {
		node.type = inputType;
	}
</script>

{#if errors}<span class="invalid">{errors}</span>{/if}

<div class="detail-group">
	<label for={label}>{label}</label>
	<div class="input-group">
		<input
			use:typeAction
			name={label}
			id={label}
			bind:value
			aria-invalid={errors ? 'true' : undefined}
			{...constraints}
			{...$$restProps}
		/>
		<span><Icon icon={icon} class="inline-block w-5 h-5 text-log-cabin" /></span>
	</div>
	{#if errors}<small class="invalid text-red-500 text-sm">{errors}</small>{/if}
	<p>{description}</p>
</div>

<style lang="postcss">
	.detail-group {
		@apply flex flex-col;
		@apply w-full;
		@apply mb-4;
	}

	.input-group {
		@apply flex flex-row items-center;
		@apply relative;
	}

	input {
		@apply w-full px-2 py-1;
		@apply rounded-md;
		@apply bg-cadet-grey text-log-cabin;
		@apply border-2 border-cadet-grey;
		@apply text-lg;
		@apply focus:border-cinnabar;
		@apply focus:outline-none;
		@apply transition-all duration-200;
	}

	span {
		@apply absolute inset-y-0 right-0 flex items-center pr-2;
	}

	label {
		@apply text-lg font-bold text-cararra-600;
		@apply mb-1 ml-0.5;
	}

	p {
		@apply text-sm text-cararra-400;
		@apply mt-1 ml-0.5;
	}
</style>
