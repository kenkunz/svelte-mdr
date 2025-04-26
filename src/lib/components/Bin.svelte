<script lang="ts">
	import { fly } from 'svelte/transition';
	import { refinery } from '$lib/refinery.svelte';
	import BoxLid from './BoxLid.svelte';

	const height = 14;
	const duration = 500;
	const maxItems = 50;

	interface Props {
		index: number;
		selected: boolean;
	}

	let { index, selected }: Props = $props();

	let element: HTMLElement;

	let items = $state(0);

	let percentFull = $derived(items / maxItems);

	let open = $derived(selected && ['openingBin', 'fillingBin'].includes(refinery.current));

	let width = $state() as number;

	export function getBoundingClientRect() {
		return element.getBoundingClientRect();
	}

	export function addItem() {
		items = Math.min(maxItems, items + 1);
	}
</script>

<div bind:this={element} class="bin" style:--height="{height}px" bind:offsetWidth={width}>
	<div class="box">
		<div class="front">{String(index).padStart(2, '0')}</div>
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
	<div class="progress">
		<div class="bar" style:width="{percentFull * 100}%"></div>
		<div class="value">{percentFull.toLocaleString('en-us', { style: 'percent' })}</div>
	</div>
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
		font-size: 1.8rem;
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
		align-items: center;

		> * {
			grid-area: 1 / -1;
		}

		.bar {
			height: 100%;
			background: currentColor;
			transition: width 0.1s ease-out;
		}

		.value {
			padding-left: 0.5rem;
			font-weight: 300;
			letter-spacing: 0.05em;
			mix-blend-mode: difference;
		}
	}
</style>
