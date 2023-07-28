import type { ArticleMeta } from '$lib/types/editor';
import type { OutputData } from '@editorjs/editorjs';
import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
import type { JSONContent } from '@tiptap/core';

export const NAV_SIDEBAR_ID = 'nav-sidebar';
export const DRAFT_SIDEBAR_ID = 'draft-sidebar';
export const PUBLISH_SIDEBAR_ID = 'publish-sidebar';
export const COMMENT_SIDEBAR_ID = 'comment-sidebar';

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
	body: JSONContent;
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

export type CommentMeta = {
	articleId: number;
	totalCount: number;
};

export function openCommentSidebar({ meta }: { meta: CommentMeta }) {
	const settings: DrawerSettings = {
		id: COMMENT_SIDEBAR_ID,
		position: 'right',
		width: 'w-full min-[520px]:w-[405px]',
		duration: 200,
		meta
	};

	drawerStore.open(settings);
}
