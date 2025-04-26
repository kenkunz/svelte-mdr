<script module lang="ts">
	export const selectedCells = new SvelteSet<number>();
</script>

<script lang="ts">
	import type { Coordinate } from '$lib/helpers';
	import { SvelteSet } from 'svelte/reactivity';
	import { gridSize, translatePx, zoomRatio } from '$lib/settings';
	import DataCell from './DataCell.svelte';
	import { refinery } from '$lib/refinery.svelte';

	let cells = $state([]);

	let x = $state(0);
	let y = $state(0);

	let scale = $state(1);

	let cursor: Coordinate = $state({ x: 0, y: 0 });

	$effect(() => {
		cells = Array.from({ length: gridSize[0] * gridSize[1] });
	});

	function handleKeyUp({ key }: KeyboardEvent) {
		// prettier-ignore
		switch (key) {
			case 'ArrowRight' : return x -= translatePx;
			case 'ArrowLeft'  : return x += translatePx;
			case 'ArrowUp'    : return y += translatePx;
			case 'ArrowDown'  : return y -= translatePx;

			case '=' : return scale *= zoomRatio;
			case '+' : return scale *= zoomRatio;
			case '-' : return scale /= zoomRatio;
			case '_' : return scale /= zoomRatio;
			case '0' : return scale = 1;

			case 'Escape' : return selectedCells.clear();
		}
	}

	function handlePointerMove(event: PointerEvent) {
		cursor.x = event.clientX;
		cursor.y = event.clientY;
	}
</script>

<svelte:document onkeyup={handleKeyUp} onpointerdowncapture={() => selectedCells.clear()} />

<section
	style:--cols={gridSize[0]}
	style:--x="{x}px"
	style:--y="{y}px"
	style:--scale={scale}
	onpointermove={handlePointerMove}
	onpointerdown={(e) => refinery.send('selectCell', e)}
	onpointerover={(e) => refinery.send('selectCell', e)}
>
	<div class="inner">
		{#each cells as _, index}
			<DataCell {index} {cursor} selected={selectedCells.has(index)} gridScale={scale} />
		{/each}
	</div>
</section>

<style>
	section {
		border-block: var(--border);
		margin-block: 6px;
		display: grid;
		place-content: center;
		overflow: hidden;
		user-select: none;
		-webkit-user-select: none;
		pointer-events: none;
	}

	.inner {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		transform: scale(var(--scale)) translate(var(--x), var(--y));
		transition: transform 0.4s ease-out;
	}
</style>
