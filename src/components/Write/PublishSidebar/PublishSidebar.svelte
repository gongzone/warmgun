<script context="module" lang="ts">
	export interface PublishSidebarMeta {
		mode: 'draft' | 'edit';
		title: string;
		body: JSONContent;
		coverImage: string | null;
		tags: string[];
		category: Category;
	}

	export function openPublishSidebar(meta: PublishSidebarMeta) {
		const settings: DrawerSettings = {
			id: 'publish-sidebar',
			position: 'right',
			width: 'w-full min-[520px]:w-[420px]',
			duration: 200,
			meta
		};
		drawerStore.open(settings);
	}
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';

	import CloseIcon from '$components/@icons/CloseIcon.svelte';
	import PublishTitle from './PublishTitle.svelte/PublishTitle.svelte';
	import CoverImagePreview from './CoverImagePreview/CoverImagePreview.svelte';
	import TagSelector from './TagSelector/TagSelector.svelte';
	import GenreSelector from './GenreSelector/GenreSelector.svelte';
	import type { JSONContent } from '@tiptap/core';
	import type { Category } from '$lib/constants/categories';
	import { onMount } from 'svelte';

	let coverImage: string | null;
	let tags: string[] = [];
	let category: Category = 'ETC';

	$: ({ mode, title, body, ...rest } = $drawerStore.meta as PublishSidebarMeta);
	$: publishAction = mode === 'draft' ? '?/createArticle' : '?/updateArticle';

	onMount(() => {
		coverImage = rest.coverImage;
		tags = rest.tags;
		category = rest.category;
	});
</script>

<header class="flex justify-between px-3 py-4 sm:px-5">
	<button type="button" class="btn btn-ringed-tertiary" on:click={() => drawerStore.close()}>
		<CloseIcon class="w-6 h-6" />
		<span>닫기</span>
	</button>

	<form
		method="POST"
		action={publishAction}
		use:enhance={({ data }) => {
			return async ({ update, result }) => {
				if (!(result.type === 'failure')) drawerStore.close();
				update();
			};
		}}
	>
		<button type="submit" class="btn variant-filled-primary">출간하기</button>
		<input type="hidden" name="title" value={title} />
		<input type="hidden" name="body" value={JSON.stringify(body)} />
		<input type="hidden" name="coverImage" value={coverImage} />
		<input type="hidden" name="tags" value={tags.join('')} />
		<input type="hidden" name="category" value={category} />
	</form>
</header>

<hr />

<ul class="space-y-10 px-8 py-8 sm:px-12">
	<li>
		<PublishTitle text="커버 이미지" />
		<CoverImagePreview bind:coverImage />
	</li>

	<li>
		<PublishTitle text="태그 선택" />
		<TagSelector bind:tags />
		<p class="text-xs opacity-50 mt-2">
			* 검색하여 태그를 찾거나, 엔터키를 눌러 태그로 설정하세요.
		</p>
	</li>

	<li>
		<PublishTitle text="장르 선택" />
		<GenreSelector bind:category />
		<p class="text-xs opacity-50 mt-2">* 적합한 장르가 없다면 기타를 선택하여 주십시오.</p>
	</li>

	<div class="h-40" />
</ul>
