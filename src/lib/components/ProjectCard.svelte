<script lang="ts">
	import type { PersonalProject } from '$lib/data/projects';
	import { base } from '$app/paths';

	let {
		project,
		index = 0,
		focused = false,
		revealed = false
	}: {
		project: PersonalProject;
		index?: number;
		focused?: boolean;
		revealed?: boolean;
	} = $props();

	const previewSrc = $derived(`${base}/previews/${project.id}.png`);
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<article
	class="card"
	class:focused
	class:revealed
	style={`--reveal-i: ${index}`}
	tabindex={focused ? 0 : -1}
	data-project-id={project.id}
	aria-label={project.title}
>
	<a class="preview" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
		<img
			src={previewSrc}
			alt=""
			width="960"
			height="540"
			loading="lazy"
			decoding="async"
		/>
		<span class="preview-overlay" aria-hidden="true">Open live site →</span>
	</a>

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
					data-action="architecture"
				>
					Architecture
				</a>
			{/if}
			<a
				class="btn ghost"
				href={project.repoUrl}
				target="_blank"
				rel="noopener noreferrer"
				data-action="source"
			>
				Source
			</a>
		</div>
	</div>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		box-shadow: var(--shadow-card);
		outline: none;
		transition:
			border-color 0.18s ease,
			box-shadow 0.22s ease,
			transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
		opacity: 0;
		transform: translateY(14px);
	}

	.card.revealed {
		/* `both` keeps opacity/transform after the animation (forwards fixes vanishing cards). */
		animation: card-reveal 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: calc(var(--reveal-i) * 55ms);
	}

	@keyframes card-reveal {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.card:hover {
		border-color: var(--border-hover);
		box-shadow: var(--shadow-card-hover);
	}

	.card.focused {
		border-color: var(--accent);
		box-shadow:
			0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent),
			var(--shadow-card-hover);
		transform: translateY(-3px) scale(1.012);
	}

	.card.focused .preview img {
		filter: saturate(1.05) contrast(1.02);
	}

	.preview {
		position: relative;
		display: block;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border-bottom: 1px solid var(--border);
		background: var(--bg);
	}

	.preview img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		transition:
			transform 0.35s ease,
			filter 0.25s ease;
	}

	.preview:hover img,
	.card.focused .preview img {
		transform: scale(1.03);
	}

	.preview-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		padding: 0.55rem 0.65rem;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		font-weight: 600;
		color: #f8fafc;
		background: linear-gradient(to top, rgba(28, 25, 23, 0.55), transparent 55%);
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.preview:hover .preview-overlay,
	.card.focused .preview-overlay {
		opacity: 1;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		flex: 1;
		padding: 0.95rem 1rem 1rem;
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	h2 {
		margin: 0;
		font-family: var(--font-serif);
		font-size: 1.1rem;
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
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		padding: 0.12rem 0.4rem;
		border-radius: 6px;
		color: var(--accent);
		background: var(--accent-soft);
	}

	.desc {
		margin: 0;
		flex: 1;
		color: var(--muted);
		line-height: 1.5;
		font-size: 0.88rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		padding-top: 0.15rem;
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
			color 0.12s ease,
			transform 0.12s ease;
	}

	.card.focused .btn.primary {
		animation: btn-pulse 1.4s ease-in-out infinite;
	}

	@keyframes btn-pulse {
		0%,
		100% {
			box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 35%, transparent);
		}
		50% {
			box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 0%, transparent);
		}
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
		.card {
			opacity: 1;
			transform: none;
			animation: none !important;
		}

		.card.revealed {
			animation: none;
		}

		.card.focused .btn.primary {
			animation: none;
		}

		.preview img {
			transition: none;
		}
	}
</style>
