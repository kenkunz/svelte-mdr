<script lang="ts">
	import LumonLogo from '$lib/assets/lumon-logo.svg?raw';
</script>

<header>
	<h1>Svelte Summit</h1>
	{@html LumonLogo}
</header>

<style>
	header {
		border-bottom: var(--border);
		padding-inline: 4rem;
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;

		h1 {
			border: var(--border);
			border-right: none;
			margin-right: -3rem;
			translate: 0 -1.5px;
			height: 100px;
			display: grid;
			align-items: center;
			padding-inline: 0.5rem;
			font-size: 4em;
			white-space: nowrap;
			overflow: hidden;
		}

		:global(svg) {
			height: 160px;
			fill: currentColor;
		}
	}
</style>
