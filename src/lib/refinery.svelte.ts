import { FiniteStateMachine } from 'runed';
import { selectedCells } from './components/DataField.svelte';
import { binInfo } from './components/Bins.svelte';

export const refinery = new FiniteStateMachine('ready', {
	ready: {
		selectCell(event) {
			if (!(event instanceof PointerEvent && event.target instanceof HTMLElement)) return;
			const { index } = event.target.dataset;
			if (event.buttons && index) {
				selectedCells.add(Number(index));
			}
		},

		selectBin(binIndex) {
			if (typeof binIndex !== 'number') return;
			binInfo.selectedIndex = binIndex;
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
			binInfo.selectedIndex = undefined;
		},

		addToBin(index) {
			if (typeof index !== 'number') return;

			selectedCells.delete(index);

			binInfo.selectedBin?.addItem();

			if (selectedCells.size === 0) {
				refinery.debounce(250, 'done');
			}
		},

		done: 'ready'
	}
});
