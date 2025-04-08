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
		_enter() {
			refinery.debounce(1000, 'done');
		},

		done: 'fillingBin'
	},

	fillingBin: {
		_exit() {
			binInfo.selectedIndex = undefined;
		},

		done(index) {
			selectedCells.delete(index);
			if (selectedCells.size === 0) return 'closingBin';
		}
	},

	closingBin: {
		_enter() {
			refinery.debounce(1000, 'done');
		},

		done: 'ready'
	}
});
