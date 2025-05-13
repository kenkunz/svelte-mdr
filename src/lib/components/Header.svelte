<script lang="ts">
	import { binManager } from '$lib/refinery.svelte';
	import LumonLogo from '$lib/assets/lumon-logo.svg?raw';

	let progressSlots = $derived(Math.ceil(binManager.percentComplete * 50));
</script>

<header>
	<div class="inner">
		<ul class="progress" style:--progress="{binManager.percentComplete * 100}%">
			{#each { length: progressSlots } as _, index}
				<li style:--index={index}></li>
			{/each}
		</ul>
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
			display: grid;
			grid-template-columns: repeat(50, 1fr);
			list-style: none;
			padding: 0;
			clip-path: inset(0 calc(100% - var(--progress, 0%)) 0 0);
			transition: clip-path 0.1s ease-out;

			li {
				background: currentColor;
				width: calc(var(--index) * 2%);
				opacity: min(calc(var(--index) * 2.5%), 100%);
			}
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
