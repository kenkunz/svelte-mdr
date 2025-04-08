import { FiniteStateMachine } from 'runed';
import { selectedCells } from './components/DataField.svelte';
import { binInfo } from './components/Bins.svelte';

export const refinery = new FiniteStateMachine('ready', {
	ready: {
		selectCell({ target, buttons }) {
			const { index } = target?.dataset ?? {};
			if (buttons && index) {
				selectedCells.add(Number(index));
			}
		},

		selectBin(binIndex) {
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
			selectedCells.delete(index);
			if (selectedCells.size === 0) {
				refinery.debounce(250, 'done');
			}
		},

		done: 'ready'
	}
});
