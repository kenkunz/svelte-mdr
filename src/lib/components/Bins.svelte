<script module>
	const bins = [1, 2, 3, 4, 5];
</script>

<script>
	import Bin from './Bin.svelte';

	let selectedBin = $state();

	function handleKeyUp({ key }) {
		if (bins.map(String).includes(key)) {
			selectedBin = Number(key);
		}
	}
</script>

<svelte:document onkeyup={handleKeyUp} />

<section>
	{#each bins as index}
		<Bin {index} selected={index === selectedBin} />
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
