<script lang="ts">
	import { onMount } from 'svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ShortcutHelp from '$lib/components/ShortcutHelp.svelte';
	import { personalProjects, type PersonalProject } from '$lib/data/projects';

	const githubProfile = 'https://github.com/manishsharma004';

	let search = $state('');
	let focusIndex = $state(0);
	let helpOpen = $state(false);
	let searchInput = $state<HTMLInputElement | null>(null);

	const filtered = $derived(
		personalProjects.filter((p) => {
			const q = search.trim().toLowerCase();
			if (!q) return true;
			return (
				p.title.toLowerCase().includes(q) ||
				p.description.toLowerCase().includes(q) ||
				p.tags.some((t) => t.toLowerCase().includes(q)) ||
				p.id.toLowerCase().includes(q)
			);
		})
	);

	$effect(() => {
		if (focusIndex >= filtered.length) {
			focusIndex = Math.max(0, filtered.length - 1);
		}
	});

	function focusedProject(): PersonalProject | undefined {
		return filtered[focusIndex];
	}

	function scrollToFocused() {
		const p = focusedProject();
		if (!p) return;
		const el = document.querySelector(`[data-project-id="${p.id}"]`);
		el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
	}

	function openLive() {
		const p = focusedProject();
		if (p) window.open(p.liveUrl, '_blank', 'noopener,noreferrer');
	}

	function openSource() {
		const p = focusedProject();
		if (p) window.open(p.repoUrl, '_blank', 'noopener,noreferrer');
	}

	function openArchitecture() {
		const p = focusedProject();
		if (p?.architectureUrl) window.open(p.architectureUrl, '_blank', 'noopener,noreferrer');
	}

	function isTypingTarget(target: EventTarget | null) {
		if (!(target instanceof HTMLElement)) return false;
		const tag = target.tagName;
		return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
	}

	onMount(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				if (helpOpen) {
					helpOpen = false;
					e.preventDefault();
					return;
				}
				if (document.activeElement === searchInput) {
					search = '';
					searchInput?.blur();
					e.preventDefault();
				}
				return;
			}

			if (e.key === '?' && !e.metaKey && !e.ctrlKey && !isTypingTarget(e.target)) {
				helpOpen = !helpOpen;
				e.preventDefault();
				return;
			}

			if (helpOpen) return;

			if (e.key === '/' && !isTypingTarget(e.target)) {
				e.preventDefault();
				searchInput?.focus();
				return;
			}

			if (isTypingTarget(e.target) && e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
				return;
			}

			if (e.key === 'j' || e.key === 'ArrowDown') {
				e.preventDefault();
				focusIndex = Math.min(focusIndex + 1, filtered.length - 1);
				scrollToFocused();
				return;
			}

			if (e.key === 'k' || e.key === 'ArrowUp') {
				e.preventDefault();
				focusIndex = Math.max(focusIndex - 1, 0);
				scrollToFocused();
				return;
			}

			if (e.key === 'Enter' || e.key === 'o') {
				if (isTypingTarget(e.target) && e.key === 'Enter') return;
				e.preventDefault();
				openLive();
				return;
			}

			if (e.key === 's' && !e.metaKey && !e.ctrlKey) {
				e.preventDefault();
				openSource();
				return;
			}

			if (e.key === 'a' && !e.metaKey && !e.ctrlKey) {
				const p = focusedProject();
				if (p?.architectureUrl) {
					e.preventDefault();
					openArchitecture();
				}
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	});
</script>

<svelte:head>
	<title>Personal projects · Manish Sharma</title>
	<meta
		name="description"
		content="A directory of personal projects hosted on GitHub Pages by Manish Sharma."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page">
	<header class="top wrap">
		<a class="brand" href={githubProfile} target="_blank" rel="noopener noreferrer">
			<span class="mark" aria-hidden="true">MS</span>
			<span class="brand-text">Manish Sharma</span>
		</a>
		<span class="top-note">~/github-pages</span>
	</header>

	<section class="hero wrap">
		<p class="eyebrow">Side projects</p>
		<h1>Personal projects</h1>
		<p class="lede">
			Static sites and browser tools on
			<a href="https://manishsharma004.github.io/" target="_blank" rel="noopener noreferrer"
				>manishsharma004.github.io</a
			>. Use <kbd>J</kbd>/<kbd>K</kbd> to focus a project — the card expands with a live screenshot preview. Press <kbd>?</kbd> for shortcuts.
		</p>
	</section>

	<main class="wrap">
		<div class="command-bar" role="search">
			<label class="search-label" for="project-search">
				<span class="prompt" aria-hidden="true">›</span>
				<input
					id="project-search"
					bind:this={searchInput}
					type="search"
					placeholder="Filter projects…  (/ to focus)"
					bind:value={search}
					autocomplete="off"
					spellcheck="false"
					onfocus={() => {
						const i = filtered.findIndex((p) => p.id === focusedProject()?.id);
						if (i >= 0) focusIndex = i;
					}}
				/>
			</label>
			<div class="command-meta">
				<span class="focus-readout" aria-live="polite">
					{#if filtered.length > 0}
						<span class="mono">{focusIndex + 1}</span>/<span class="mono">{filtered.length}</span>
						{#if focusedProject()}
							<span class="sep">·</span>
							<span class="name">{focusedProject()?.title}</span>
						{/if}
					{:else}
						No matches
					{/if}
				</span>
				<button type="button" class="help-btn" onclick={() => (helpOpen = true)} title="Shortcuts (?)">
					?
				</button>
			</div>
		</div>

		{#if filtered.length === 0}
			<p class="empty">No projects match <code>{search}</code>. <button type="button" onclick={() => (search = '')}>Clear</button></p>
		{:else}
			<ul class="project-list">
				{#each filtered as project, i (project.id)}
					<li
						class:expanded={i === focusIndex}
						onmouseenter={() => (focusIndex = i)}
						onfocusin={() => (focusIndex = i)}
					>
						<ProjectCard
							{project}
							focused={i === focusIndex}
							expanded={i === focusIndex}
						/>
					</li>
				{/each}
			</ul>
		{/if}
	</main>

	<footer class="wrap foot">
		<p>
			Built with
			<a href="https://svelte.dev/docs/kit" target="_blank" rel="noopener noreferrer">SvelteKit</a>
			·
			<a
				href="https://github.com/manishsharma004/personal-projects"
				target="_blank"
				rel="noopener noreferrer">personal-projects</a
			>
			· previews via <code>bun run previews</code>
		</p>
	</footer>
</div>

<ShortcutHelp open={helpOpen} onClose={() => (helpOpen = false)} />

<style>
	.page {
		padding-bottom: 4rem;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-block: 1.25rem 0.75rem;
		border-bottom: 1px solid var(--border);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		color: var(--ink);
		text-decoration: none;
		font-weight: 600;
		font-size: 0.95rem;
	}

	.brand:hover {
		color: var(--accent);
	}

	.mark {
		display: inline-grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: 8px;
		background: var(--accent);
		color: #f8fafc;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.04em;
	}

	.top-note {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--faint);
		letter-spacing: 0.02em;
	}

	.hero {
		padding-block: 2.25rem 1.5rem;
	}

	.eyebrow {
		margin: 0 0 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--faint);
	}

	h1 {
		margin: 0 0 0.85rem;
		font-family: var(--font-serif);
		font-size: clamp(2.25rem, 4.5vw, 3rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--ink);
		line-height: 1.15;
	}

	.lede {
		margin: 0;
		max-width: 42rem;
		font-size: 1.05rem;
		color: var(--muted);
	}

	.lede a {
		font-weight: 500;
		text-underline-offset: 3px;
	}

	.lede kbd {
		font-family: var(--font-mono);
		font-size: 0.78em;
		padding: 0.1rem 0.35rem;
		border-radius: 5px;
		border: 1px solid var(--border);
		background: var(--surface);
	}

	.lede kbd + kbd {
		margin-left: 0.1rem;
	}

	.command-bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.65rem 1rem;
		margin-bottom: 1rem;
		padding: 0.55rem 0.65rem;
		border-radius: 10px;
		border: 1px solid var(--border);
		background: color-mix(in srgb, var(--surface) 88%, var(--bg));
		box-shadow: var(--shadow-card);
	}

	.search-label {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		flex: 1;
		min-width: min(100%, 220px);
	}

	.prompt {
		font-family: var(--font-mono);
		font-weight: 700;
		color: var(--accent);
	}

	.search-label input {
		width: 100%;
		border: none;
		background: transparent;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--ink);
		outline: none;
	}

	.search-label input::placeholder {
		color: var(--faint);
	}

	.search-label:focus-within {
		outline: 2px solid color-mix(in srgb, var(--accent) 35%, transparent);
		outline-offset: 2px;
		border-radius: 6px;
	}

	.command-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.focus-readout {
		font-size: 0.78rem;
		color: var(--muted);
		max-width: 16rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mono {
		font-family: var(--font-mono);
		font-weight: 600;
		color: var(--ink);
	}

	.sep {
		margin-inline: 0.25rem;
		opacity: 0.5;
	}

	.name {
		color: var(--accent);
		font-weight: 500;
	}

	.help-btn {
		width: 1.65rem;
		height: 1.65rem;
		border-radius: 8px;
		border: 1px solid var(--border);
		background: var(--surface);
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 0.85rem;
		cursor: pointer;
		color: var(--muted);
		transition:
			border-color 0.15s ease,
			color 0.15s ease,
			transform 0.15s ease;
	}

	.help-btn:hover {
		border-color: var(--accent);
		color: var(--accent);
		transform: scale(1.05);
	}

	.empty {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--muted);
	}

	.empty button {
		font: inherit;
		color: var(--accent);
		background: none;
		border: none;
		cursor: pointer;
		text-decoration: underline;
	}

	.project-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.project-list > li {
		display: flex;
		min-width: 0;
		transition: margin 0.25s ease;
	}

	.project-list > li.expanded {
		margin-block: 0.35rem;
	}

	.foot {
		margin-top: 3rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--border);
		font-size: 0.9rem;
		color: var(--muted);
	}

	.foot p {
		margin: 0;
	}

	.foot a {
		text-underline-offset: 3px;
	}

	.foot code {
		font-family: var(--font-mono);
		font-size: 0.82em;
	}
</style>
