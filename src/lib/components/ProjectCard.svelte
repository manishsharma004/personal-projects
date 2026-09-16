<script lang="ts">
	import type { PersonalProject } from '$lib/data/projects';

	let { project }: { project: PersonalProject } = $props();
</script>

<article class="card">
	<header>
		<h2>
			<a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{project.title}</a>
		</h2>
		<p class="tags" aria-label="Technologies">
			{#each project.tags as tag, i}
				{#if i > 0}<span class="sep" aria-hidden="true">·</span>{/if}
				<span>{tag}</span>
			{/each}
		</p>
	</header>
	<p class="desc">{project.description}</p>
	<div class="actions">
		<a class="btn primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
			Open site
		</a>
		{#if project.architectureUrl}
			<a
				class="btn ghost"
				href={project.architectureUrl}
				target="_blank"
				rel="noopener noreferrer"
			>
				Architecture
			</a>
		{/if}
		<a class="btn ghost" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
			Source
		</a>
	</div>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		height: 100%;
		padding: 1.35rem 1.4rem 1.25rem;
		background: inherit;
		transition: background 0.15s ease;
	}

	.card:hover {
		background: var(--surface);
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	h2 {
		margin: 0;
		font-family: var(--font-serif);
		font-size: 1.2rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		line-height: 1.25;
	}

	h2 a {
		color: var(--ink);
		text-decoration: none;
	}

	h2 a:hover {
		color: var(--accent);
	}

	.tags {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--faint);
		letter-spacing: 0.02em;
	}

	.sep {
		margin-inline: 0.35rem;
		opacity: 0.5;
	}

	.desc {
		margin: 0;
		flex: 1;
		color: var(--muted);
		line-height: 1.55;
		font-size: 0.94rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		padding-top: 0.35rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.4rem 0.75rem;
		border-radius: 8px;
		font-size: 0.8125rem;
		font-weight: 600;
		text-decoration: none;
		border: 1px solid transparent;
		transition:
			background 0.12s ease,
			border-color 0.12s ease,
			color 0.12s ease;
	}

	.primary {
		background: var(--accent);
		color: #fff;
	}

	.primary:hover {
		background: var(--accent-hover);
		color: #fff;
	}

	.ghost {
		border-color: var(--border);
		color: var(--text);
		background: transparent;
	}

	.ghost:hover {
		border-color: var(--border-hover);
		color: var(--accent);
	}
</style>
