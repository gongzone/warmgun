import type { EditorData } from '$api/draft';
import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';

export function openNavSidebar() {
	const navSidebarSettings: DrawerSettings = {
		id: 'nav-sidebar',
		position: 'left',
		width: 'w-[325px]',
		duration: 200
	};
	drawerStore.open(navSidebarSettings);
}

export function openDraftSidebar() {
	const draftSidebarSettings: DrawerSettings = {
		id: 'draft-sidebar',
		position: 'left',
		width: 'w-full md:w-[485px]',
		duration: 200
	};
	drawerStore.open(draftSidebarSettings);
}

export function openPublishSidebar(meta: EditorData) {
	const publishSidebarSettings: DrawerSettings = {
		id: 'publish-sidebar',
		position: 'right',
		width: 'w-full sm:w-[420px]',
		duration: 200,
		meta
	};
	drawerStore.open(publishSidebarSettings);
}
