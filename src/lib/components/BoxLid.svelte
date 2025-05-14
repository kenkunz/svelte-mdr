<script lang="ts">
	import type { TransitionConfig } from 'svelte/transition';

	const maxAngle = Math.PI * 0.75;

	interface Props {
		width: number;
		height: number;
		duration: number;
		side: 'left' | 'right';
	}

	let { width, height, duration, side }: Props = $props();

	let radius = $derived(width / 2);

	function pivot(node: SVGPathElement, { duration = 500 }): TransitionConfig {
		return {
			duration,
			tick: (t, u) => {
				const angle = t * maxAngle;
				const x = radius * Math.cos(angle);
				const y = radius * Math.sin(angle);

				const d = [
					`M0 ${u * height}`,
					`L${x} ${-y + u * height}`,
					`L${x} ${-y + height}`,
					`L0 ${height}`,
					`L0 ${u * height}`
				].join(' ');

				node.setAttribute('d', d);
			}
		};
	}
</script>

<svg
	viewBox="0 0 {width} {height}"
	class={side}
	style:--xflip={side === 'right' ? 1 : -1}
	xmlns="http://www.w3.org/2000/svg"
>
	<path transition:pivot={{ duration }} />
</svg>

<style>
	svg {
		top: 2px;
		overflow: visible;
		fill: none;
		stroke: var(--color-fg);
		stroke-width: 4;
		stroke-linejoin: round;
		translate: calc(var(--flip) * -1px) calc(-1 * var(--height));
		scale: calc(var(--flip) * -1) 1;
		--flip: 1;

		&.left {
			--flip: -1;
		}

		path {
			fill: var(--color-bg);
		}
	}
</style>
