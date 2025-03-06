<script>
	import { cursorRadius, maxScale } from '$lib/settings';
	import { randomInt } from '$lib/helpers';

	let { cursor } = $props();

	let el;

	const value = randomInt(0, 9);
	const range = Math.random() * 15;
	const duration = randomInt(1000, 5000);
	const axis = randomInt(0, 1) ? 'x' : 'y';

	let scale = $derived.by(() => {
		// reference cursor before (!el) so the dependency is tracked!
		const { x, y } = cursor;

		if (!el) return 1;

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
	});
</script>

<div
	bind:this={el}
	class={axis}
	style:--range="{range}%"
	style:--duration="{duration}ms"
	style:--number-scale={scale}
>
	<span>{value}</span>
</div>

<style>
	div {
		width: 5rem;
		height: 5rem;
		display: grid;
		place-content: center;
		font-size: 1.25rem;
		font-weight: 300;
		animation: var(--duration) infinite alternate linear;
		--range-neg: calc(-1 * var(--range));

		&.x {
			animation-name: x-axis;
		}

		&.y {
			animation-name: y-axis;
		}

		span {
			transform: scale(var(--number-scale));
			transition: transform 0.5s ease-out;
		}
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
