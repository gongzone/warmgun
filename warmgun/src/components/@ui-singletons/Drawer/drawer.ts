import type { OutputData } from '@editorjs/editorjs';
import type { Draft } from '@prisma/client';
import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';

export const DRAFT_SIDEBAR_ID = 'draft-sidebar';
export const PUBLISH_SIDEBAR_ID = 'publish-sidebar';

export type DraftMeta = Draft[];

export function openDraftSidebar({ meta }: { meta: DraftMeta }) {
	const settings: DrawerSettings = {
		id: DRAFT_SIDEBAR_ID,
		position: 'left',
		width: 'w-full sm:w-[485px]',
		duration: 200,
		meta
	};

	drawerStore.open(settings);
}

export type PublishMeta = {
	title: string;
	subTitle: string;
	body: OutputData;
};

export function openPublishSidebar({ meta }: { meta: PublishMeta }) {
	const publishSidebarSettings: DrawerSettings = {
		id: PUBLISH_SIDEBAR_ID,
		position: 'right',
		width: 'w-full sm:w-[420px]',
		duration: 200,
		meta
	};
	drawerStore.open(publishSidebarSettings);
}
