<script lang="ts">
	import { VIEW_MODES, type ViewMode } from '$lib/viewMode';

	let {
		value,
		onchange
	}: {
		value: ViewMode;
		onchange: (mode: ViewMode) => void;
	} = $props();
</script>

<div class="switcher" role="radiogroup" aria-label="Layout view">
	{#each VIEW_MODES as mode}
		<button
			type="button"
			class:active={value === mode.id}
			role="radio"
			aria-checked={value === mode.id}
			title="{mode.label} — {mode.hint}"
			onclick={() => onchange(mode.id)}
		>
			{mode.label}
		</button>
	{/each}
</div>

<style>
	.switcher {
		display: inline-flex;
		border: 1px solid var(--border);
		border-radius: 9px;
		overflow: hidden;
		background: var(--bg);
	}

	button {
		border: none;
		background: transparent;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 600;
		padding: 0.35rem 0.55rem;
		cursor: pointer;
		color: var(--muted);
		transition:
			background 0.12s ease,
			color 0.12s ease;
	}

	button + button {
		border-left: 1px solid var(--border);
	}

	button:hover {
		color: var(--ink);
		background: color-mix(in srgb, var(--accent-soft) 50%, transparent);
	}

	button.active {
		background: var(--accent);
		color: #f8fafc;
	}

	button.active:hover {
		background: var(--accent-hover);
		color: #f8fafc;
	}
</style>
