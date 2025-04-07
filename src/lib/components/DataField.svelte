<script module>
	export const selectedCells = new SvelteSet();
</script>

<script>
	import { SvelteSet } from 'svelte/reactivity';
	import { gridSize, translatePx, zoomRatio } from '$lib/settings';
	import DataCell from './DataCell.svelte';

	let cells = $state([]);

	let x = $state(0);
	let y = $state(0);

	let scale = $state(1);

	let cursor = $state({ x: 0, y: 0 });

	$effect(() => {
		cells = Array.from({ length: gridSize[0] * gridSize[1] });
	});

	function handleKeyUp({ key }) {
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

	function handlePointerMove(event) {
		cursor.x = event.clientX;
		cursor.y = event.clientY;
	}

	function selectCell({ target, buttons }) {
		const { index } = target?.dataset ?? {};
		if (buttons && index) {
			selectedCells.add(Number(index));
		}
	}
</script>

<svelte:document onkeyup={handleKeyUp} onpointerdowncapture={() => selectedCells.clear()} />

<section
	style:--cols={gridSize[0]}
	style:--x="{x}px"
	style:--y="{y}px"
	style:--scale={scale}
	onpointermove={handlePointerMove}
	onpointerdown={selectCell}
	onpointerover={selectCell}
>
	<div class="inner">
		{#each cells as _, index}
			<DataCell {index} {cursor} gridScale={scale} />
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
