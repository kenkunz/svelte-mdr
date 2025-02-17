<script>
	import Header from '$lib/components/Header.svelte';
	import DataField from '$lib/components/DataField.svelte';
	import Bins from '$lib/components/Bins.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<main>
	<Header />
	<DataField />
	<Bins />
	<Footer />
</main>

<style>
	main {
		height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr auto auto;
	}
</style>
