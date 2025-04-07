<script>
	import { fly } from 'svelte/transition';
	import { cursorRadius, maxScale, selectedScale } from '$lib/settings';
	import { randomInt } from '$lib/helpers';
	import { selectedCells } from './DataField.svelte';
	import { binInfo } from './Bins.svelte';

	let { index, cursor } = $props();

	let element;

	let selected = $derived(selectedCells.has(index));

	let scale = $derived.by(() => getScale(element, cursor));

	const value = randomInt(0, 9);
	const range = Math.random() * 15;
	const duration = randomInt(1000, 5000);
	const axis = randomInt(0, 1) ? 'x' : 'y';

	function getScale(el, { x, y }) {
		if (!el) return 1;

		if (selected) return selectedScale;

		const rect = el.getBoundingClientRect();

		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const dx = centerX - x;
		const dy = centerY - y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance > cursorRadius) return 1;

		// calculate ratio to scale by (between 0 and 1)
		const scaleRatio = (cursorRadius - distance) / cursorRadius;

		// apply scaleRatio up to maxScale
		return 1 + (maxScale - 1) * scaleRatio;
	}

	function handleOutroEnd() {
		selectedCells.delete(index);
		if (selectedCells.size === 0) {
			binInfo.selected = undefined;
		}
	}
</script>

<div bind:this={element} class="data-cell" data-index={index}>
	{#if !(selected && binInfo.selected)}
		<div
			class={['inner', axis]}
			style:--range="{range}%"
			style:--duration="{duration}ms"
			style:--number-scale={scale}
			out:fly={{ y: 250, opacity: 1, duration: 1000 }}
			onoutroend={handleOutroEnd}
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
