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
			class={['movement', axis]}
			style:--range="{range}%"
			style:--duration="{duration}ms"
			style:--number-scale={scale}
			out:fly={{ y: 1000, opacity: 1, duration: 1000 }}
			onoutroend={handleOutroEnd}
		>
			<div class="scale">{value}</div>
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

	.movement {
		pointer-events: none;
		animation: var(--duration) infinite alternate linear;
		--range-neg: calc(-1 * var(--range));

		&.x {
			animation-name: x-axis;
		}

		&.y {
			animation-name: y-axis;
		}
	}

	.scale {
		place-content: center;
		font-size: 1.25rem;
		font-weight: 300;
		transform: scale(var(--number-scale));
		transition: transform 0.5s ease-out;
	}

	@keyframes x-axis {
		from {
			transform: translateX(var(--range-neg));
		}
		to {
			transform: translateX(var(--range));
		}
	}

	@keyframes y-axis {
		from {
			transform: translateY(var(--range-neg));
		}
		to {
			transform: translateY(var(--range));
		}
	}
</style>
