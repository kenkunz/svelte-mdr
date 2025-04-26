<script lang="ts">
	let coords = $state([]);

	function getHexString() {
		return Math.random().toString(16).slice(2, 8).padEnd(6, '0');
	}

	$effect(() => {
		coords = [getHexString(), getHexString()].sort();
	});
</script>

<footer>
	{#each coords as coord}
		<span>0x{coord}</span>
	{/each}
</footer>

<style>
	footer {
		display: grid;
		grid-template-columns: auto auto;
		place-content: center;
		font-size: 1.5rem;
		font-weight: 500;
		letter-spacing: 0.04em;

		span:first-child::after {
			content: ':';
			margin-inline: 1rem;
		}
	}
</style>
