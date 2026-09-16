/**
 * Capture card previews for each project (run: bun run previews).
 * Requires: bun add -d playwright && bunx playwright install chromium
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'static', 'previews');

const projects = [
	{ id: 'LLM101n-ai-implementation', url: 'https://manishsharma004.github.io/LLM101n-ai-implementation/' },
	{ id: 'developer-basics', url: 'https://manishsharma004.github.io/developer-basics/' },
	{ id: 'system-design-copilot', url: 'https://manishsharma004.github.io/system-design-copilot/' },
	{ id: 'agent-games', url: 'https://manishsharma004.github.io/agent-games/' },
	{ id: 'template-viewer', url: 'https://manishsharma004.github.io/template-viewer/' },
	{ id: 'retro-games', url: 'https://manishsharma004.github.io/retro-games/' },
	{ id: 'system-design-interview-prep', url: 'https://manishsharma004.github.io/system-design-interview-prep/' },
	{ id: 'chess-clock', url: 'https://manishsharma004.github.io/chess-clock/' },
	{ id: 'claude-code-facts', url: 'https://manishsharma004.github.io/claude-code-facts/' },
	{ id: 'dosbox-virtualization', url: 'https://manishsharma004.github.io/dosbox-virtualization/' },
	{ id: 'exploding-kittens-game', url: 'https://manishsharma004.github.io/exploding-kittens-game/' },
	{
		id: 'exploding-kittens-normal-deck',
		url: 'https://manishsharma004.github.io/exploding-kittens-normal-deck/'
	}
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
	viewport: { width: 960, height: 540 },
	deviceScaleFactor: 1
});

for (const { id, url } of projects) {
	const page = await context.newPage();
	const waitMs = id === 'retro-games' || id === 'dosbox-virtualization' ? 8000 : 3500;
	try {
		console.log(`→ ${id}`);
		await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90_000 });
		await page.waitForTimeout(waitMs);
		await page.screenshot({
			path: join(outDir, `${id}.png`),
			type: 'png',
			fullPage: false
		});
	} catch (err) {
		console.error(`  failed: ${err.message}`);
	} finally {
		await page.close();
	}
}

await browser.close();
console.log(`Done. Wrote PNGs to static/previews/`);
