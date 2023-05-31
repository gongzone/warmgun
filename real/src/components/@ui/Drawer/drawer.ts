import type { ArticleMeta } from '$lib/types/editor';
import type { OutputData } from '@editorjs/editorjs';
import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';

export const NAV_SIDEBAR_ID = 'nav-sidebar';
export const DRAFT_SIDEBAR_ID = 'draft-sidebar';
export const PUBLISH_SIDEBAR_ID = 'publish-sidebar';

export function openNavSidebar() {
	const settings: DrawerSettings = {
		id: NAV_SIDEBAR_ID,
		position: 'left',
		width: 'w-[325px]',
		duration: 200
	};
	drawerStore.open(settings);
}

export function openDraftSidebar() {
	const settings: DrawerSettings = {
		id: DRAFT_SIDEBAR_ID,
		position: 'left',
		width: 'w-full min-[520px]:w-[485px]',
		duration: 200
	};
	drawerStore.open(settings);
}

export type PublishMeta = {
	mode: 'draft' | 'edit';
	title: string;
	body: OutputData;
	articleMeta: ArticleMeta | undefined;
};

export function openPublishSidebar({ meta }: { meta: PublishMeta }) {
	const settings: DrawerSettings = {
		id: PUBLISH_SIDEBAR_ID,
		position: 'right',
		width: 'w-full min-[520px]:w-[420px]',
		duration: 200,
		meta
	};
	drawerStore.open(settings);
}
