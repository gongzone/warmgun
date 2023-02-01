import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';

export const NAVIGATION_ID = 'NAVIGATION';

export function openNavigation() {
	const settings: DrawerSettings = {
		id: NAVIGATION_ID,
		position: 'left',
		width: 'w-[325px]',
		duration: 200
	};

	drawerStore.open(settings);
}
