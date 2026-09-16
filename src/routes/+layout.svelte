<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';

	let { children } = $props();

	const favicon = `${base}/favicon.svg`;
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href={favicon} />
</svelte:head>

{@render children()}
