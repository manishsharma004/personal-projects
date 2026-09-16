export type PersonalProject = {
	id: string;
	title: string;
	description: string;
	tags: string[];
	liveUrl: string;
	repoUrl: string;
	/** Archify runtime map on GitHub Pages, when the repo publishes one */
	architectureUrl?: string;
};

const pagesBase = 'https://manishsharma004.github.io';
const repoBase = 'https://github.com/manishsharma004';

/** Live GitHub Pages sites — featured order first, then the rest. */
export const personalProjects: PersonalProject[] = [
	{
		id: 'LLM101n-ai-implementation',
		title: 'LLM101n — Storyteller',
		description:
			'Browser implementation of the LLM101n syllabus with in-tab labs and a Storyteller flow.',
		tags: ['React', 'LLM', 'Education'],
		liveUrl: `${pagesBase}/LLM101n-ai-implementation/`,
		repoUrl: `${repoBase}/LLM101n-ai-implementation`,
		architectureUrl: `${pagesBase}/LLM101n-ai-implementation/architecture/llm101n-runtime.architecture.html`
	},
	{
		id: 'developer-basics',
		title: 'Developer Basics',
		description:
			'Interactive course with in-browser Python labs — variables through APIs, React, and tooling.',
		tags: ['React', 'TypeScript', 'Pyodide', 'Education'],
		liveUrl: `${pagesBase}/developer-basics/`,
		repoUrl: `${repoBase}/developer-basics`,
		architectureUrl: `${pagesBase}/developer-basics/architecture/developer-basics-runtime.architecture.html`
	},
	{
		id: 'system-design-copilot',
		title: 'System Design Copilot',
		description: 'Study companion for system design interviews with guided prompts and references.',
		tags: ['React', 'Learning'],
		liveUrl: `${pagesBase}/system-design-copilot/`,
		repoUrl: `${repoBase}/system-design-copilot`
	},
	{
		id: 'agent-games',
		title: 'Agent Games',
		description: 'Small games and experiments built around agent-style workflows.',
		tags: ['Games', 'Agents'],
		liveUrl: `${pagesBase}/agent-games/`,
		repoUrl: `${repoBase}/agent-games`
	},
	{
		id: 'template-viewer',
		title: 'Template Viewer',
		description: 'Preview and compare document or UI templates in the browser.',
		tags: ['Tools', 'Viewer'],
		liveUrl: `${pagesBase}/template-viewer/`,
		repoUrl: `${repoBase}/template-viewer`
	},
	{
		id: 'retro-games',
		title: 'Retro Games',
		description: 'Browser NES and SNES emulator with ROM library, shaders, and WebRTC multiplayer.',
		tags: ['React', 'Emulation', 'WebRTC'],
		liveUrl: `${pagesBase}/retro-games/`,
		repoUrl: `${repoBase}/retro-games`,
		architectureUrl: `${pagesBase}/retro-games/architecture/retro-games-runtime.architecture.html`
	},
	{
		id: 'system-design-interview-prep',
		title: 'System Design Interview Prep',
		description: 'Practice scenarios and notes for distributed systems and architecture interviews.',
		tags: ['Study', 'System design'],
		liveUrl: `${pagesBase}/system-design-interview-prep/`,
		repoUrl: `${repoBase}/system-design-interview-prep`
	},
	{
		id: 'chess-clock',
		title: 'Chess Clock',
		description: 'Simple chess clock for over-the-board games in the browser.',
		tags: ['Games', 'PWA'],
		liveUrl: `${pagesBase}/chess-clock/`,
		repoUrl: `${repoBase}/chess-clock`
	},
	{
		id: 'claude-code-facts',
		title: 'Claude Code Facts',
		description: 'Chuck Norris–style facts inspired by Claude Code hype.',
		tags: ['Fun', 'Static'],
		liveUrl: `${pagesBase}/claude-code-facts/`,
		repoUrl: `${repoBase}/claude-code-facts`
	},
	{
		id: 'dosbox-virtualization',
		title: 'DOSBox Virtualization',
		description: 'Run classic DOS software in the browser via emulation.',
		tags: ['Emulation', 'DOS'],
		liveUrl: `${pagesBase}/dosbox-virtualization/`,
		repoUrl: `${repoBase}/dosbox-virtualization`
	},
	{
		id: 'exploding-kittens-game',
		title: 'Exploding Kittens',
		description: 'Browser card game inspired by Exploding Kittens.',
		tags: ['Games', 'Cards'],
		liveUrl: `${pagesBase}/exploding-kittens-game/`,
		repoUrl: `${repoBase}/exploding-kittens-game`
	},
	{
		id: 'exploding-kittens-normal-deck',
		title: 'Exploding Kittens (Normal Deck)',
		description: 'Alternate deck variant of the Exploding Kittens browser game.',
		tags: ['Games', 'Cards'],
		liveUrl: `${pagesBase}/exploding-kittens-normal-deck/`,
		repoUrl: `${repoBase}/exploding-kittens-normal-deck`
	}
];
