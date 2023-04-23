import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';

export const NAV_SIDEBAR = 'nav-sidebar';
export const DRAFT_SIDEBAR = 'draft-sidebar';
export const PUBLISH_SIDEBAR = 'publish-sidebar';

export function openNavSidebar() {
	const navSidebarSettings: DrawerSettings = {
		id: NAV_SIDEBAR,
		position: 'left',
		width: 'w-[325px]',
		duration: 200
	};
	drawerStore.open(navSidebarSettings);
}

export function openDraftSidebar() {
	const draftSidebarSettings: DrawerSettings = {
		id: DRAFT_SIDEBAR,
		position: 'left',
		width: 'w-full md:w-[485px]',
		duration: 200
	};
	drawerStore.open(draftSidebarSettings);
}

export function openPublishSidebar(meta: any) {
	const publishSidebarSettings: DrawerSettings = {
		id: PUBLISH_SIDEBAR,
		position: 'right',
		width: 'w-full sm:w-[420px]',
		duration: 200,
		meta
	};
	drawerStore.open(publishSidebarSettings);
}
