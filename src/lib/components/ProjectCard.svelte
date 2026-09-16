<script lang="ts">
	import type { PersonalProject } from '$lib/data/projects';

	let { project }: { project: PersonalProject } = $props();
</script>

<article class="card">
	<header>
		<h2>{project.title}</h2>
		<ul class="tags" aria-label="Technologies">
			{#each project.tags as tag}
				<li>{tag}</li>
			{/each}
		</ul>
	</header>
	<p>{project.description}</p>
	<div class="actions">
		<a class="btn primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
			Open site
		</a>
		<a class="btn ghost" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
			Source
		</a>
	</div>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 1.25rem 1.35rem;
		border-radius: 14px;
		border: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
		background: color-mix(in srgb, var(--surface) 92%, var(--accent) 8%);
		box-shadow: 0 10px 30px color-mix(in srgb, var(--ink) 8%, transparent);
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	h2 {
		margin: 0;
		font-size: 1.15rem;
		font-weight: 650;
		letter-spacing: -0.02em;
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
		font-size: 0.72rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 0.2rem 0.45rem;
		border-radius: 999px;
		background: color-mix(in srgb, var(--accent) 18%, transparent);
		color: var(--accent-strong);
	}

	p {
		margin: 0;
		flex: 1;
		color: var(--muted);
		line-height: 1.55;
		font-size: 0.95rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.45rem 0.85rem;
		border-radius: 10px;
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		border: 1px solid transparent;
		transition:
			background 0.15s ease,
			border-color 0.15s ease,
			color 0.15s ease;
	}

	.primary {
		background: var(--accent-strong);
		color: var(--on-accent);
	}

	.primary:hover {
		background: color-mix(in srgb, var(--accent-strong) 88%, white);
	}

	.ghost {
		border-color: color-mix(in srgb, var(--ink) 18%, transparent);
		color: var(--ink);
	}

	.ghost:hover {
		border-color: var(--accent-strong);
		color: var(--accent-strong);
	}
</style>
