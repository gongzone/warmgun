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
