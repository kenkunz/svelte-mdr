<section>
	{#each { length: 500 }}
		<div>{Math.floor(Math.random() * 10)}</div>
	{/each}
</section>

<style>
	section {
		margin-block: 0.75rem;
		border-block: 4px solid currentColor;
		display: flex;
		flex-wrap: wrap;
		overflow: hidden;
		font-size: 1.25rem;
		font-weight: 300;
	}

	div {
		flex: 0 0 5rem;
		height: 5rem;
		display: grid;
		place-content: center;
	}
</style>
