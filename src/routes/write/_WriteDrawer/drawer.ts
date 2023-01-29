import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';

const draftSettings: DrawerSettings = {
	id: 'DRAFT',
	position: 'left',
	width: 'w-full md:w-[485px]',
	duration: 200
};

const publishSettings: DrawerSettings = {
	id: 'PUBLISH',
	position: 'right',
	width: 'w-full sm:w-[420px]',
	duration: 200
};

export const drawers = {
	DRAFT: draftSettings,
	PUBLISH: publishSettings
} as const;

type DrawerIds = keyof typeof drawers;

export function openDrawer(type: DrawerIds, meta?: DrawerSettings['meta']) {
	const settings = {
		...drawers[type],
		meta
	};
	drawerStore.open(settings);
}

// export function updateDrawer(type: DrawerIds, meta?: DrawerSettings['meta']) {
// 	const settings = {
// 		...drawers[type],
// 		meta
// 	};
// 	drawerStore.set(settings);
// }
