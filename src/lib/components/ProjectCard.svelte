<script lang="ts">
	import type { PersonalProject } from '$lib/data/projects';
	import { base } from '$app/paths';

	let {
		project,
		focused = false,
		expanded = false
	}: {
		project: PersonalProject;
		focused?: boolean;
		expanded?: boolean;
	} = $props();

	const previewSrc = $derived(`${base}/previews/${project.id}.png`);
	const showPreview = $derived(expanded || focused);
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<article
	class="card"
	class:focused
	class:expanded
	tabindex={focused ? 0 : -1}
	data-project-id={project.id}
	aria-label={project.title}
	aria-expanded={expanded}
>
	<div class="preview-reveal" class:open={showPreview}>
		<div class="preview-reveal-inner">
			<a class="preview" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
				<img
					src={previewSrc}
					alt=""
					width="960"
					height="540"
					loading={expanded ? 'eager' : 'lazy'}
					decoding="async"
				/>
				<span class="preview-overlay" aria-hidden="true">Open live site →</span>
			</a>
		</div>
	</div>

	<div class="body">
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

		{#if expanded}
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
		{:else}
			<p class="desc compact">{project.description}</p>
		{/if}
	</div>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		box-shadow: var(--shadow-card);
		outline: none;
		overflow: hidden;
		transition:
			border-color 0.2s ease,
			box-shadow 0.25s ease,
			transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.card.focused {
		border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
		box-shadow:
			0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent),
			var(--shadow-card-hover);
	}

	.card.expanded {
		border-color: var(--accent);
		transform: scale(1.01);
		z-index: 1;
	}

	.preview-reveal {
		display: grid;
		grid-template-rows: 0fr;
		opacity: 0;
		transition:
			grid-template-rows 0.45s cubic-bezier(0.22, 1, 0.36, 1),
			opacity 0.35s ease;
	}

	.preview-reveal.open {
		grid-template-rows: 1fr;
		opacity: 1;
	}

	.preview-reveal-inner {
		overflow: hidden;
		min-height: 0;
	}

	.preview {
		position: relative;
		display: block;
		aspect-ratio: 16 / 9;
		max-height: min(52vh, 420px);
		overflow: hidden;
		border-bottom: 1px solid var(--border);
		background: var(--bg);
	}

	.card.expanded .preview {
		max-height: min(58vh, 480px);
	}

	.preview img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		transition: transform 0.4s ease;
	}

	.card.expanded .preview img,
	.card.focused .preview img {
		transform: scale(1.02);
	}

	.preview-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		padding: 0.65rem 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 600;
		color: #f8fafc;
		background: linear-gradient(to top, rgba(28, 25, 23, 0.6), transparent 50%);
		opacity: 0;
		transition: opacity 0.25s ease;
	}

	.card.expanded .preview-overlay,
	.preview:hover .preview-overlay {
		opacity: 1;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		padding: 0.75rem 1rem 0.85rem;
	}

	.card.expanded .body {
		padding: 1rem 1.15rem 1.1rem;
		gap: 0.65rem;
	}

	header {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.35rem 0.75rem;
	}

	h2 {
		margin: 0;
		font-family: var(--font-serif);
		font-size: 1.05rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		line-height: 1.3;
	}

	.card.expanded h2 {
		font-size: 1.25rem;
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
		gap: 0.3rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.tags li {
		font-size: 0.62rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		padding: 0.1rem 0.38rem;
		border-radius: 6px;
		color: var(--accent);
		background: var(--accent-soft);
	}

	.desc {
		margin: 0;
		color: var(--muted);
		line-height: 1.5;
		font-size: 0.88rem;
	}

	.desc.compact {
		font-size: 0.82rem;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		padding-top: 0.1rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.38rem 0.72rem;
		border-radius: 8px;
		font-size: 0.78rem;
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

	@media (prefers-reduced-motion: reduce) {
		.preview-reveal {
			transition: none;
		}

		.preview-reveal.open {
			opacity: 1;
			grid-template-rows: 1fr;
		}

		.preview img {
			transition: none;
		}

		.card.expanded {
			transform: none;
		}
	}
</style>
