import { SvelteSet } from 'svelte/reactivity';
import { FiniteStateMachine } from 'runed';
import { BinManager } from './bin-manager.svelte';

export const selectedCells = new SvelteSet<number>();

export const binManager = new BinManager();

export const refinery = new FiniteStateMachine('ready', {
	ready: {
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
		done: 'fillingBin'
	},

	fillingBin: {
		_enter() {
			if (selectedCells.size === 0) {
				refinery.debounce(500, 'done');
			}
		},

		_exit() {
			binManager.selectedIndex = undefined;
		},

		addToBin(index) {
			if (typeof index !== 'number') return;

			selectedCells.delete(index);

			binManager.selectedBin?.addItem();

			if (selectedCells.size === 0) {
				refinery.debounce(250, 'done');
			}
		},

		done: 'ready'
	}
});
