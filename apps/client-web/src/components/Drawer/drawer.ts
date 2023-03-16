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
