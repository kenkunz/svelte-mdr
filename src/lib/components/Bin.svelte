<script>
	import { fly } from 'svelte/transition';
	import { refinery } from '$lib/refinery.svelte';
	import BoxLid from './BoxLid.svelte';

	const height = 14;
	const duration = 500;

	let { index, selected } = $props();

	let element;

	let open = $derived(selected && ['openingBin', 'fillingBin'].includes(refinery.current));

	let width = $state();

	export function getBoundingClientRect() {
		return element?.getBoundingClientRect();
	}
</script>

<div bind:this={element} class="bin" style:--height="{height}px" bind:offsetWidth={width}>
	<div class="box">
		<div class="front">{String(index).padStart(2, 0)}</div>
		{#if open}
			<div
				class="rear-lid"
				onintroend={() => refinery.send('done')}
				transition:fly={{ duration, opacity: 1, y: height }}
			></div>
			<BoxLid {height} {width} {duration} side="left" />
			<BoxLid {height} {width} {duration} side="right" />
		{/if}
	</div>
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
		position: relative;

		> :global(*) {
			position: absolute;
		}
	}

	.front {
		border: var(--border);
		width: 100%;
		height: 100%;
		display: grid;
		font-weight: bold;
		place-content: center;
	}

	.rear-lid {
		border-top: var(--border);
		width: 100%;
		top: calc(-1 * var(--height) + 1px);
	}

	.progress {
		border: var(--border);
		display: grid;
		align-content: center;
		padding-inline: 0.25rem;
	}
</style>
