<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import DataField from '$lib/components/DataField.svelte';
	import Bins from '$lib/components/Bins.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import cursorUrl from '$lib/assets/cursor.svg';

	const cursor = `url("${cursorUrl}"), default`;
</script>

<main style:cursor>
	<Header />
	<DataField />
	<Bins />
	<Footer />
</main>

<style>
	main {
		height: 100vh;
		display: grid;
		grid-template-rows: 9rem 1fr 8rem 4rem;
		--border: 3px solid var(--color-fg);
	}
</style>
