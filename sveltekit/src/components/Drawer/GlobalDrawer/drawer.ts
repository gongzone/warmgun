import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';

export const NAV_SIDEBAR = 'NAV';

export function openNavSidebar() {
	const settings: DrawerSettings = {
		id: NAV_SIDEBAR,
		position: 'left',
		width: 'w-[325px]',
		duration: 200
	};

	drawerStore.open(settings);
}
