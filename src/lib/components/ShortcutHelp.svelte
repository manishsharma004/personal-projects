<script lang="ts">
	let { open = false, onClose }: { open?: boolean; onClose: () => void } = $props();

	const shortcuts = [
		{ keys: '1 / 2 / 3', desc: 'List, grid, or split view' },
		{ keys: '[ / ]', desc: 'Cycle layout view' },
		{ keys: '/', desc: 'Focus search' },
		{ keys: 'Esc', desc: 'Clear search / close help' },
		{ keys: 'J / ↓', desc: 'Next project (expands preview)' },
		{ keys: 'K / ↑', desc: 'Previous project (expands preview)' },
		{ keys: 'Enter / O', desc: 'Open focused project site' },
		{ keys: 'S', desc: 'Open focused project source on GitHub' },
		{ keys: 'A', desc: 'Open architecture map (when available)' },
		{ keys: '?', desc: 'Toggle this help' }
	];
</script>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="backdrop" onclick={onClose} role="presentation"></div>
	<div class="panel" role="dialog" aria-modal="true" aria-labelledby="shortcut-title">
		<header>
			<h2 id="shortcut-title">Keyboard shortcuts</h2>
			<button type="button" class="close" onclick={onClose} aria-label="Close">×</button>
		</header>
		<ul>
			{#each shortcuts as row}
				<li>
					<kbd>{row.keys}</kbd>
					<span>{row.desc}</span>
				</li>
			{/each}
		</ul>
		<p class="hint">Vim-style navigation works when search is not focused.</p>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(28, 25, 23, 0.45);
		z-index: 40;
		animation: fade-in 0.2s ease;
	}

	.panel {
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 50;
		width: min(420px, calc(100% - 2rem));
		transform: translate(-50%, -50%);
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		box-shadow: var(--shadow-card-hover);
		padding: 1.1rem 1.2rem 1rem;
		animation: panel-in 0.28s cubic-bezier(0.22, 1, 0.36, 1);
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes panel-in {
		from {
			opacity: 0;
			transform: translate(-50%, -48%) scale(0.96);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.85rem;
	}

	h2 {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--muted);
	}

	.close {
		border: none;
		background: transparent;
		font-size: 1.35rem;
		line-height: 1;
		cursor: pointer;
		color: var(--faint);
		padding: 0.15rem 0.35rem;
		border-radius: 6px;
	}

	.close:hover {
		color: var(--ink);
		background: var(--accent-soft);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.9rem;
		color: var(--text);
	}

	kbd {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		padding: 0.2rem 0.45rem;
		border-radius: 6px;
		border: 1px solid var(--border);
		background: var(--bg);
		color: var(--ink);
		white-space: nowrap;
	}

	.hint {
		margin: 0.85rem 0 0;
		font-size: 0.78rem;
		color: var(--faint);
		font-family: var(--font-mono);
	}
</style>
