<script lang="ts">
	import { binManager } from '$lib/refinery.svelte';
	import LumonLogo from '$lib/assets/lumon-logo.svg?raw';
</script>

<header>
	<div class="inner">
		<div class="progress" style:width="{binManager.percentComplete * 100}%"></div>
		<h1>Svelte Summit</h1>
	</div>
	{@html LumonLogo}
</header>

<style>
	header {
		border-bottom: var(--border);
		padding-inline: 4rem;
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;

		.inner {
			display: grid;
			align-items: center;

			height: 100px;
			translate: 0 -1.5px;

			> * {
				grid-area: 1 / -1;
				height: 100%;
			}
		}

		.progress {
			background: currentColor;
			opacity: 0.5;
			transition: width 0.1s ease-out;
		}

		h1 {
			display: grid;
			align-items: center;

			border: var(--border);
			border-right: none;
			margin-right: -3rem;
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
