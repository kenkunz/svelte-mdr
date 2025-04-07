<script module>
	const indices = [1, 2, 3, 4, 5];

	class BinInfo {
		instances = $state({});
		selectedIndex = $state();

		get selectedBin() {
			return this.instances[this.selectedIndex];
		}
	}

	export const binInfo = new BinInfo();
</script>

<script>
	import Bin from './Bin.svelte';

	function handleKeyUp({ key }) {
		if (indices.map(String).includes(key)) {
			binInfo.selectedIndex = Number(key);
		}
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
		overflow: hidden;
	}
</style>
