<script>
	let numbers = $state([]);

	let x = $state(0);
	let y = $state(0);
	let z = $state(1);

	$effect(() => {
		numbers = Array(500);
	});

	function handleKeyUp({ key }) {
		// prettier-ignore
		switch (key) {
			case 'ArrowRight' : return x -= 150;
			case 'ArrowLeft'  : return x += 150;
			case 'ArrowUp'    : return y += 150;
			case 'ArrowDown'  : return y -= 150;

			case '=' : return z *= 1.2;
			case '+' : return z *= 1.2;
			case '-' : return z /= 1.2;
			case '_' : return z /= 1.2;
			case '0' : return z = 1;
		}
	}
</script>

<svelte:document onkeyup={handleKeyUp} />

<section style:--x="{x}px" style:--y="{y}px" style:--scale={z}>
	<div class="inner">
		{#each numbers}
			<div class="number">
				{Math.floor(Math.random() * 10)}
			</div>
		{/each}
	</div>
</section>

<style>
	section {
		margin-block: 0.5rem;
		border-block: 4px solid currentColor;
		height: calc(100% - 1rem);
		display: grid;
		place-content: center;
		overflow: hidden;
	}

	.inner {
		display: grid;
		grid-template-columns: repeat(25, 1fr);
		transform: scale(var(--scale)) translate(var(--x), var(--y));
		transition: transform 0.4s ease-out;
	}

	.number {
		width: 5rem;
		height: 5rem;
		display: grid;
		place-content: center;
		font-size: 1.25rem;
		font-weight: 300;
	}
</style>
