<script>
	import { gridSize, translatePx, zoomRatio } from '$lib/settings';
	import Number from '$lib/components/Number.svelte';

	let numbers = $state([]);

	let x = $state(0);
	let y = $state(0);
	let z = $state(1);

	let cursor = $state({ x: 0, y: 0 });

	$effect(() => {
		numbers = Array(gridSize[0] * gridSize[1]);
	});

	function handleKeyUp({ key }) {
		// prettier-ignore
		switch (key) {
			case 'ArrowRight' : return x -= translatePx;
			case 'ArrowLeft'  : return x += translatePx;
			case 'ArrowUp'    : return y += translatePx;
			case 'ArrowDown'  : return y -= translatePx;

			case '=' : return z *= zoomRatio;
			case '+' : return z *= zoomRatio;
			case '-' : return z /= zoomRatio;
			case '_' : return z /= zoomRatio;
			case '0' : return z = 1;
		}
	}

	function handlePointerMove(event) {
		cursor.x = event.clientX;
		cursor.y = event.clientY;
	}
</script>

<svelte:document onkeyup={handleKeyUp} onpointermove={handlePointerMove} />

<section style:--cols={gridSize[0]} style:--x="{x}px" style:--y="{y}px" style:--scale={z}>
	<div class="inner">
		{#each numbers}
			<Number {cursor} />
		{/each}
	</div>
</section>

<style>
	section {
		margin-block: 0.5rem;
		border-block: 4px solid currentColor;
		height: calc(100% - 1rem);
		display: grid;
		place-content: center;
		overflow: hidden;
	}

	.inner {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		transform: scale(var(--scale)) translate(var(--x), var(--y));
		transition: transform 0.4s ease-out;
	}
</style>
