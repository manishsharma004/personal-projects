<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { personalProjects } from '$lib/data/projects';

	const githubProfile = 'https://github.com/manishsharma004';
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
		<span class="top-note">GitHub Pages index</span>
	</header>

	<section class="hero wrap">
		<p class="eyebrow">Side projects</p>
		<h1>Personal projects</h1>
		<p class="lede">
			Static sites and browser tools hosted at
			<a href="https://manishsharma004.github.io/" target="_blank" rel="noopener noreferrer"
				>manishsharma004.github.io</a
			>. Each card links to the live app and its repository.
		</p>
	</section>

	<main class="wrap">
		<div class="list-head">
			<h2 class="list-title">Live sites</h2>
			<p class="count" aria-live="polite">{personalProjects.length} projects</p>
		</div>
		<ul class="grid">
			{#each personalProjects as project (project.id)}
				<li>
					<ProjectCard {project} />
				</li>
			{/each}
		</ul>
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
			repo
		</p>
	</footer>
</div>

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
		padding-block: 2.75rem 2rem;
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
		margin: 0 0 1rem;
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

	.list-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.25rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--border);
	}

	.list-title {
		margin: 0;
		font-size: 0.85rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--muted);
	}

	.count {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--faint);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
		gap: 0.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
		align-items: stretch;
	}

	.grid > li {
		display: flex;
		min-width: 0;
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
</style>
