import Bin from './components/Bin.svelte';

const INDICES = [1, 2, 3, 4, 5] as const;

export type BinIndex = (typeof INDICES)[number];

export class BinManager {
	instances: Partial<Record<BinIndex, Bin>> = $state({});
	selectedIndex: BinIndex | undefined = $state();

	get indices() {
		return INDICES;
	}

	get selectedBin() {
		return this.selectedIndex && this.instances[this.selectedIndex];
	}

	selectBin(value: unknown) {
		const index = Number(value);
		if (!this.isBinIndex(index)) {
			throw new Error(`Invalid bin index: ${value}`);
		}
		this.selectedIndex = index;
	}

	isBinIndex(value: unknown): value is BinIndex {
		const index = Number(value);
		return this.indices.some((i) => i === index);
	}
}
