<script>
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { cursorRadius, maxScale, selectedScale } from '$lib/settings';
	import { randomInt, getNodeMidpoint, getDistance, getNodeDistance } from '$lib/helpers';
	import { selectedCells } from './DataField.svelte';
	import { binInfo } from './Bins.svelte';

	let { index, cursor } = $props();

	let element = $state();

	let selected = $derived(selectedCells.has(index));

	const value = randomInt(0, 9);
	const range = Math.random() * 15;
	const duration = randomInt(1000, 5000);
	const axis = randomInt(0, 1) ? 'x' : 'y';

	let scale = $derived.by(() => {
		if (!element) return 1;
		if (selected) return selectedScale;

		const { distance } = getDistance(cursor, getNodeMidpoint(element));
		if (distance > cursorRadius) return 1;

		// calculate ratio to scale by (between 0 and 1)
		const scaleRatio = (cursorRadius - distance) / cursorRadius;

		// apply scaleRatio up to maxScale
		return 1 + (maxScale - 1) * scaleRatio;
	});

	function handleOutroEnd() {
		selectedCells.delete(index);
		if (selectedCells.size === 0) {
			binInfo.selectedIndex = undefined;
		}
	}

	function funnelToBin(node) {
		const { dx, dy, distance } = getNodeDistance(node, binInfo.selectedBin);

		return {
			duration: distance * 1.5,
			css: (t, u) => `translate: ${dx * cubicOut(u)}px ${dy * u}px`
		};
	}
</script>

<div bind:this={element} class="data-cell" data-index={index}>
	{#if !(selected && binInfo.selectedBin)}
		<div
			class={['inner', axis]}
			style:--range="{range}%"
			style:--duration="{duration}ms"
			style:--number-scale={scale}
			onoutroend={handleOutroEnd}
			out:funnelToBin
		>
			{value}
		</div>
	{/if}
</div>

<style>
	div {
		display: grid;
	}

	.data-cell {
		width: 5rem;
		height: 5rem;
		pointer-events: auto;
	}

	.inner {
		place-content: center;
		font-size: 1.25rem;
		font-weight: 300;
		pointer-events: none;
		scale: var(--number-scale);
		transition: scale 0.5s ease-out;
		animation: var(--duration) infinite wiggle alternate linear;

		&.x {
			--translate-from: calc(-1 * var(--range));
			--translate-to: var(--range);
		}

		&.y {
			--translate-from: 0 calc(-1 * var(--range));
			--translate-to: 0 var(--range);
		}
	}

	@keyframes wiggle {
		from {
			translate: var(--translate-from);
		}
		to {
			translate: var(--translate-to);
		}
	}
</style>
