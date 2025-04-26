<script module lang="ts">
	import Bin from './Bin.svelte';

	const indices = [1, 2, 3, 4, 5];

	export function isBinKey(key: string) {
		return indices.map(String).includes(key);
	}

	class BinInfo {
		instances: Record<(typeof indices)[number], Bin> = $state({});
		selectedIndex: number | undefined = $state();

		get selectedBin() {
			if (this.selectedIndex !== undefined) {
				return this.instances[this.selectedIndex];
			}
		}
	}

	export const binInfo = new BinInfo();
</script>

<script lang="ts">
	import { refinery } from '$lib/refinery.svelte';

	function handleKeyUp({ key }: KeyboardEvent) {
		if (isBinKey(key)) refinery.send('selectBin', Number(key));
	}
</script>

<svelte:document onkeyup={handleKeyUp} />

<section>
	{#each indices as index}
		<Bin bind:this={binInfo.instances[index]} {index} selected={index === binInfo.selectedIndex} />
	{/each}
</section>

<style>
	section {
		border-block: var(--border);
		padding-inline: 4rem;
		display: flex;
		gap: max(2.5%, 1rem);
		justify-content: center;
		overflow: visible;
		contain: size layout;
	}
</style>
