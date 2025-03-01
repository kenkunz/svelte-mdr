<script>
	import { randomInt } from '$lib/helpers';

	const value = randomInt(0, 9);
	const range = Math.random() * 15;
	const duration = randomInt(1000, 5000);
	const axis = randomInt(0, 1) ? 'x' : 'y';
</script>

<div class="number {axis}" style:--range="{range}%" style:--duration="{duration}ms">
	{value}
</div>

<style>
	.number {
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
