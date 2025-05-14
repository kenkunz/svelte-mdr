import { SvelteSet } from 'svelte/reactivity';
import { Tween } from 'svelte/motion';
import { FiniteStateMachine } from 'runed';
import { Viewport } from '$lib/viewport.svelte';
import { BinManager } from '$lib/bin-manager.svelte';

export const viewport = new Viewport();

export const selectedCells = new SvelteSet<number>();

export const binManager = new BinManager();

export const percentComplete = new Tween(0, {
	duration: (from, to) => Math.round((to - from) * 5_000)
});

type States = 'ready' | 'openingBin' | 'fillingBin' | 'binDrawerOpen' | 'closingBin';

type Actions =
	| 'panViewport'
	| 'zoomViewport'
	| 'selectCell'
	| 'clearCells'
	| 'selectBin'
	| 'addToBin'
	| 'transitionEnded'
	| 'done';

export const refinery = new FiniteStateMachine<States, Actions>('ready', {
	ready: {
		_enter() {
			binManager.selectedIndex = undefined;
		},

		panViewport(coordinate) {
			viewport.translate(coordinate);
		},

		zoomViewport(direction) {
			viewport.zoom(direction);
		},

		selectCell(event) {
			if (!(event instanceof PointerEvent && event.target instanceof HTMLElement)) return;
			const { index } = event.target.dataset;
			if (event.buttons && index) {
				selectedCells.add(Number(index));
			}
		},

		clearCells() {
			selectedCells.clear();
		},

		selectBin(binIndex) {
			binManager.selectBin(binIndex);
			return 'openingBin';
		}
	},

	openingBin: {
		transitionEnded: 'fillingBin'
	},

	fillingBin: {
		_enter() {
			if (selectedCells.size === 0) {
				refinery.debounce(500, 'done');
			}
		},

		addToBin(index) {
			if (typeof index !== 'number') return;

			selectedCells.delete(index);

			binManager.selectedBin?.addItem();

			if (selectedCells.size === 0) {
				refinery.debounce(500, 'done');
			}
		},

		done: 'binDrawerOpen'
	},

	binDrawerOpen: {
		transitionEnded() {
			refinery.debounce(1000, 'done');
		},

		done: 'closingBin'
	},

	closingBin: {
		_exit() {
			percentComplete.target = binManager.percentComplete;
		},

		transitionEnded: 'ready'
	}
});
