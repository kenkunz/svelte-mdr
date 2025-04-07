<script>
	let { index, selected } = $props();

	let element;

	export function getBoundingClientRect() {
		return element?.getBoundingClientRect();
	}
</script>

<div bind:this={element} class="bin">
	<div class="box">{String(index).padStart(2, 0)}</div>
	<div class="progress">0%</div>
</div>

<style>
	.bin {
		--space: 8px;
		flex: 1;
		min-width: 8rem;
		max-width: 20rem;
		display: grid;
		grid-template-rows: 5fr 4fr;
		gap: var(--space);
		padding-block: var(--space);
		font-size: 2rem;
	}

	.box {
		border: var(--border);
		display: grid;
		place-content: center;
		font-weight: bold;
	}

	.progress {
		border: var(--border);
		display: grid;
		align-content: center;
		padding-inline: 0.25rem;
	}
</style>
