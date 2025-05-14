<script lang="ts">
	import { maxTemperCount } from '$lib/settings';
	import { type TemperCounts, tempers } from '$lib/tempers';

	interface Props {
		index: number;
		temperCounts: TemperCounts;
		open: boolean;
		ontransitionend: (e: TransitionEvent) => void;
	}

	let { index, temperCounts, open, ontransitionend }: Props = $props();
</script>

<div class="bin-drawer">
	<div class={['inner', open && 'open']} {ontransitionend}>
		<h3>0{index}</h3>
		<dl>
			{#each tempers as temper}
				{@const percentFull = temperCounts[temper] / maxTemperCount}
				<div style:color="var(--color-{temper})">
					<dt class={temper}>{temper}</dt>
					<dd class={temper}>
						<div style:width="{percentFull * 100}%"></div>
					</dd>
				</div>
			{/each}
		</dl>
	</div>
</div>

<style>
	.bin-drawer {
		bottom: 100%;
		width: 100%;
		overflow: hidden;
		pointer-events: none;
	}

	.inner {
		border: var(--border);
		padding: 0.5rem;
		background: var(--color-bg);
		transition: translate 250ms ease-out;

		&:not(.open) {
			translate: 0 100%;
		}
	}

	h3 {
		margin: 0;
		padding: 0.125rem;
		font-size: inherit;
		font-weight: medium;
		border: var(--border);
		display: grid;
		justify-content: center;
	}

	dl {
		margin-block: 1.5rem;
		margin-left: 0.25rem;
		display: grid;
		gap: 1rem;
		grid-template-columns: auto 1fr;
		align-items: center;
		font-size: 1.5rem;

		> div {
			display: contents;
		}

		dt {
			letter-spacing: 0.05em;
		}

		dd {
			border: 2px solid currentColor;
			margin: 0;
			height: 100%;

			div {
				height: 100%;
				background: currentColor;
			}
		}
	}
</style>
