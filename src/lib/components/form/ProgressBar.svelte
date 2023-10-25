<script lang="ts">
	export let steps: any[] = [],
		currentActive: number = 1;
	let circles: any, progress: any;

	export const handleProgress = (stepIncrement: number): void => {
		circles = document.querySelectorAll('.circle');
		if (stepIncrement == 1) {
			currentActive++;
			if (currentActive > circles.length) currentActive = circles.length;
		} else {
			currentActive--;
			if (currentActive < 1) currentActive = 1;
		}
		update();
	};

	function update(): void {
		circles.forEach((circle: any, idx: any) => {
			if (idx < currentActive) {
				circle.classList.add('active');
			} else {
				circle.classList.remove('active');
			}
		});
		const actives = document.querySelectorAll('.active');
		progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + '%';
	}
</script>

<div class="progress-container" bind:this={circles}>
	<div class="progress" bind:this={progress} />
	{#each steps as step, i}
		<div class="circle {i == 0 ? 'active' : ''}" data-title={step}>{i + 1}</div>
	{/each}
</div>

<style lang="postcss">
	.progress-container {
		display: flex;
		justify-content: space-between;
		position: relative;
		max-width: 100%;
		width: 350px;
		@apply flex-none mb-4;
	}

	.progress-container::before {
		content: '';
		background-color: #a2aebb;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		height: 4px;
		width: 100%;
		z-index: -1;
	}

	.progress {
		background-color: #e8ae3b;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		height: 4px;
		width: 0%;
		z-index: -1;
		transition: 0.4s ease;
	}

	.circle {
		background-color: #ecede6;
		color: #a2aebb;
		border-radius: 50%;
		height: 30px;
		width: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 5px solid #e0e0e0;
		transition: 0.4s ease;
		cursor: pointer;
	}

	.circle::after {
		content: attr(data-title) ' ';
		position: absolute;
		bottom: 35px;
		color: #a2aebb;
		transition: 0.4s ease;
	}

	.circle.active::after {
		color: #e8ae3b;
	}

	.circle.active {
		border-color: #e8ae3b;
	}
</style>
