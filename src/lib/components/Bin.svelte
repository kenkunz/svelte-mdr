<script lang="ts">
	import { fly } from 'svelte/transition';
	import { refinery } from '$lib/refinery.svelte';
	import BoxLid from './BoxLid.svelte';
	import BinDrawer from './BinDrawer.svelte';
	import { maxTemperCount } from '$lib/settings';
	import { getRandomTemper } from '$lib/tempers';
	import { formatPercent } from '$lib/formatters';

	const height = 20;
	const duration = 500;

	interface Props {
		index: number;
		selected: boolean;
	}

	let { index, selected }: Props = $props();

	let element: HTMLElement;

	let temperCounts = $state({
		WO: 0,
		FC: 0,
		DR: 0,
		MA: 0
	});

	let binCount = $derived(Object.values(temperCounts).reduce((sum, count) => sum + count, 0));

	let percentFull = $derived(formatPercent(binCount / (maxTemperCount * 4)));

	let binOpen = $derived(selected && refinery.current !== 'ready');

	let drawerOpen = $derived(selected && refinery.current === 'binDrawerOpen');

	let width = $state() as number;

	export function getBoundingClientRect() {
		return element.getBoundingClientRect();
	}

	export function addItem() {
		const temper = getRandomTemper();
		if (temperCounts[temper] < maxTemperCount) {
			temperCounts[temper]++;
		}
	}

	export function getBinCount() {
		return binCount;
	}
</script>

<div
	bind:this={element}
	class="bin"
	style:--height="{height}px"
	style:--width="{width}px"
	bind:offsetWidth={width}
>
	<div class="box">
		<div class="front">0{index}</div>
		{#if binOpen}
			<div
				class="rear-lid"
				onintroend={() => refinery.send('transitionEnded')}
				transition:fly={{ duration, opacity: 1, y: height }}
			></div>
			<BoxLid {height} {width} {duration} side="left" />
			<BoxLid {height} {width} {duration} side="right" />
			<BinDrawer
				{index}
				{temperCounts}
				open={drawerOpen}
				ontransitionend={() => refinery.send('transitionEnded')}
			/>
		{/if}
	</div>
	<div class="progress">
		<div class="bar" style:width={percentFull}></div>
		<div class="value">{percentFull}</div>
	</div>
</div>

<style>
	.bin {
		--space: 8px;
		flex: 1;
		min-width: 8rem;
		max-width: 20rem;
		display: grid;
		grid-template-rows: 1fr 1fr;
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
		background: var(--color-bg);
		width: 100%;
		height: var(--height);
		translate: 0 -100%;
		z-index: -1;
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
			background: var(--color-fg);
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
