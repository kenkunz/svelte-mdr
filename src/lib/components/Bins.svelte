<script>
	import Bin from './Bin.svelte';
</script>

<section>
	{#each [1, 2, 3, 4, 5] as index}
		<Bin {index} />
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
