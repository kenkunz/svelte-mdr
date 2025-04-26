<script lang="ts">
	import type { Coordinate } from '$lib/helpers';
	import { gridSize, translatePx, zoomRatio } from '$lib/settings';
	import { refinery, viewport, selectedCells } from '$lib/refinery.svelte';
	import DataCell from './DataCell.svelte';

	let cells = $state([]);

	let cursor: Coordinate = $state({ x: 0, y: 0 });

	$effect(() => {
		cells = Array.from({ length: gridSize[0] * gridSize[1] });
	});

	function handleKeyUp({ key }: KeyboardEvent) {
		// prettier-ignore
		switch (key) {
			case 'ArrowRight' : return viewport.x -= translatePx;
			case 'ArrowLeft'  : return viewport.x += translatePx;
			case 'ArrowUp'    : return viewport.y += translatePx;
			case 'ArrowDown'  : return viewport.y -= translatePx;

			case '=' : return viewport.scale *= zoomRatio;
			case '+' : return viewport.scale *= zoomRatio;
			case '-' : return viewport.scale /= zoomRatio;
			case '_' : return viewport.scale /= zoomRatio;
			case '0' : return viewport.scale = 1;

			case 'Escape' : return refinery.send('clearCells')
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
	style:--x="{viewport.x}px"
	style:--y="{viewport.y}px"
	style:--scale={viewport.scale}
	onpointermove={handlePointerMove}
	onpointerdown={(e) => refinery.send('selectCell', e)}
	onpointerover={(e) => refinery.send('selectCell', e)}
>
	<div class="inner">
		{#each cells as _, index}
			<DataCell {index} {cursor} selected={selectedCells.has(index)} />
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
