import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';

export const DRAFT_SIDEBAR = 'DRAFT';
export const PUBLISH_SIDEBAR = 'PUBLISH';

export function openDraftSidebar() {
	const settings: DrawerSettings = {
		id: DRAFT_SIDEBAR,
		position: 'left',
		width: 'w-full md:w-[485px]',
		duration: 200
	};

	drawerStore.open(settings);
}

export function openPublishSidebar(meta: { title: string; subTitle: string; body: string }) {
	const settings: DrawerSettings = {
		id: PUBLISH_SIDEBAR,
		position: 'right',
		width: 'w-full sm:w-[420px]',
		duration: 200,
		meta
	};

	drawerStore.open(settings);
}
