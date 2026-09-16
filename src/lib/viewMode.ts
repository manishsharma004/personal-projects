export type ViewMode = 'list' | 'grid' | 'split';

export const VIEW_MODES: { id: ViewMode; label: string; hint: string }[] = [
	{ id: 'list', label: 'List', hint: 'Expand on focus' },
	{ id: 'grid', label: 'Grid', hint: 'All previews' },
	{ id: 'split', label: 'Split', hint: 'Sidebar + stage' }
];

const STORAGE_KEY = 'personal-projects-view';

export function loadViewMode(): ViewMode {
	if (typeof localStorage === 'undefined') return 'list';
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'list' || stored === 'grid' || stored === 'split') return stored;
	return 'list';
}

export function saveViewMode(mode: ViewMode) {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem(STORAGE_KEY, mode);
}
