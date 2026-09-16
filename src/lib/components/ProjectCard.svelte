<script lang="ts">
	import type { PersonalProject } from '$lib/data/projects';

	let { project }: { project: PersonalProject } = $props();
</script>

<article class="card">
	<header>
		<h2>
			<a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{project.title}</a>
		</h2>
		<ul class="tags" aria-label="Technologies">
			{#each project.tags as tag}
				<li>{tag}</li>
			{/each}
		</ul>
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
		gap: 0.65rem;
		height: 100%;
		padding: 1.15rem 1.2rem 1.1rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		box-shadow: var(--shadow-card);
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease,
			transform 0.15s ease;
	}

	.card:hover {
		border-color: var(--border-hover);
		box-shadow: var(--shadow-card-hover);
		transform: translateY(-1px);
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	h2 {
		margin: 0;
		font-family: var(--font-serif);
		font-size: 1.15rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		line-height: 1.3;
	}

	h2 a {
		color: var(--ink);
		text-decoration: none;
	}

	h2 a:hover {
		color: var(--accent);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.tags li {
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		padding: 0.15rem 0.45rem;
		border-radius: 6px;
		color: var(--accent);
		background: var(--accent-soft);
	}

	.desc {
		margin: 0;
		flex: 1;
		color: var(--muted);
		line-height: 1.55;
		font-size: 0.92rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		padding-top: 0.25rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.42rem 0.8rem;
		border-radius: 9px;
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
		color: #f8fafc;
	}

	.primary:hover {
		background: var(--accent-hover);
		color: #f8fafc;
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
