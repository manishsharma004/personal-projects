import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const base: '' | `/${string}` = process.env.BASE_PATH
	? (process.env.BASE_PATH as `/${string}`)
	: '';

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter({ strict: true }),
			paths: { base },
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			}
		})
	]
});
