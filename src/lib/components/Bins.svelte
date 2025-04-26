<script lang="ts">
	import { refinery, binManager } from '$lib/refinery.svelte';
	import Bin from './Bin.svelte';

	function handleKeyUp({ key }: KeyboardEvent) {
		if (binManager.isBinIndex(key)) {
			refinery.send('selectBin', key);
		}
	}
</script>

<svelte:document onkeyup={handleKeyUp} />

<section>
	{#each binManager.indices as index}
		<Bin
			bind:this={binManager.instances[index]}
			{index}
			selected={index === binManager.selectedIndex}
		/>
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
