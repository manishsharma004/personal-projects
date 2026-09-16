<script lang="ts">
	import type { PersonalProject } from '$lib/data/projects';
	import { base } from '$app/paths';

	let { project }: { project: PersonalProject | undefined } = $props();

	const previewSrc = $derived(project ? `${base}/previews/${project.id}.png` : '');
</script>

<section class="stage" aria-label="Project preview">
	{#if project}
		<a class="preview" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
			<img src={previewSrc} alt="" width="960" height="540" loading="eager" decoding="async" />
			<span class="overlay">Open live site →</span>
		</a>
		<div class="meta">
			<h2>{project.title}</h2>
			<p class="desc">{project.description}</p>
			<ul class="tags" aria-label="Technologies">
				{#each project.tags as tag}
					<li>{tag}</li>
				{/each}
			</ul>
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
		</div>
	{:else}
		<p class="empty">No project selected.</p>
	{/if}
</section>

<style>
	.stage {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		min-width: 0;
		padding: 0.85rem;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--surface);
		box-shadow: var(--shadow-card);
		position: sticky;
		top: 1rem;
	}

	.preview {
		position: relative;
		display: block;
		border-radius: calc(var(--radius) - 4px);
		overflow: hidden;
		border: 1px solid var(--border);
		aspect-ratio: 16 / 9;
		max-height: min(52vh, 520px);
		background: var(--bg);
	}

	.preview img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
	}

	.overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		padding: 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 600;
		color: #f8fafc;
		background: linear-gradient(to top, rgba(28, 25, 23, 0.55), transparent 50%);
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.preview:hover .overlay {
		opacity: 1;
	}

	.meta h2 {
		margin: 0 0 0.45rem;
		font-family: var(--font-serif);
		font-size: 1.35rem;
		color: var(--ink);
	}

	.desc {
		margin: 0 0 0.65rem;
		color: var(--muted);
		line-height: 1.55;
		font-size: 0.95rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin: 0 0 0.75rem;
		padding: 0;
		list-style: none;
	}

	.tags li {
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		padding: 0.12rem 0.4rem;
		border-radius: 6px;
		color: var(--accent);
		background: var(--accent-soft);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.btn {
		display: inline-flex;
		padding: 0.45rem 0.8rem;
		border-radius: 8px;
		font-size: 0.8125rem;
		font-weight: 600;
		text-decoration: none;
		border: 1px solid transparent;
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
	}

	.ghost:hover {
		color: var(--accent);
		border-color: var(--border-hover);
	}

	.empty {
		margin: 0;
		font-family: var(--font-mono);
		color: var(--faint);
		font-size: 0.85rem;
	}
</style>
