import type { Draft } from '@prisma/client';
import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';

export const DRAFT_SIDEBAR_ID = 'draft-sidebar';

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
