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
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page">
	<header class="hero wrap">
		<p class="eyebrow">GitHub Pages</p>
		<h1>Personal projects</h1>
		<p class="lede">
			Browser apps and learning tools I ship as static sites on
			<strong>manishsharma004.github.io</strong>. Pick a project to open the live site or view
			source on GitHub.
		</p>
		<a class="profile" href={githubProfile} target="_blank" rel="noopener noreferrer">
			@manishsharma004 on GitHub
		</a>
	</header>

	<main class="wrap">
		<p class="count" aria-live="polite">{personalProjects.length} live sites</p>
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
			This index is built with
			<a href="https://svelte.dev/docs/kit" target="_blank" rel="noopener noreferrer">SvelteKit</a>
			and deployed from the
			<a
				href="https://github.com/manishsharma004/personal-projects"
				target="_blank"
				rel="noopener noreferrer">personal-projects</a
			>
			repository.
		</p>
	</footer>
</div>

<style>
	.page {
		padding-block: 2.5rem 3rem;
	}

	.hero {
		padding-bottom: 2rem;
	}

	.eyebrow {
		margin: 0 0 0.35rem;
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--accent-strong);
	}

	h1 {
		margin: 0 0 0.65rem;
		font-size: clamp(2rem, 4vw, 2.75rem);
		font-weight: 750;
		letter-spacing: -0.03em;
	}

	.lede {
		margin: 0;
		max-width: 52ch;
		font-size: 1.05rem;
		color: var(--muted);
	}

	.profile {
		display: inline-flex;
		margin-top: 1.25rem;
		padding: 0.5rem 0.9rem;
		border-radius: 999px;
		font-weight: 600;
		font-size: 0.9rem;
		text-decoration: none;
		border: 1px solid color-mix(in srgb, var(--ink) 15%, transparent);
		background: color-mix(in srgb, var(--surface) 85%, transparent);
	}

	.profile:hover {
		border-color: var(--accent-strong);
		color: var(--accent-strong);
	}

	.count {
		margin: 0 0 1rem;
		font-size: 0.9rem;
		color: var(--muted);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.foot {
		margin-top: 2.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
		font-size: 0.9rem;
		color: var(--muted);
	}

	.foot a {
		color: var(--accent-strong);
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
	}
</style>
