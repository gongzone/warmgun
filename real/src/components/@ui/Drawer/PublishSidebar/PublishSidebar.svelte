<script lang="ts">
	import { enhance } from '$app/forms';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { createEventDispatcher, onDestroy } from 'svelte';

	import type { PublishMeta } from '$components/@ui/Drawer/drawer';
	import CloseIcon from '$components/@icons/CloseIcon.svelte';
	import PublishTitle from './PublishTitle.svelte/PublishTitle.svelte';
	import CoverImagePreview from './CoverImagePreview/CoverImagePreview.svelte';
	import TagSelector from './TagSelector/TagSelector.svelte';
	import GenreSelector from './GenreSelector/GenreSelector.svelte';

	export let coverImage: string | null;
	export let tags: string[];
	export let genre: string;

	$: ({ title, body } = $drawerStore.meta as PublishMeta);

	const dispatch = createEventDispatcher();

	onDestroy(() => {
		dispatch('close', { coverImage, tags, genre });
	});
</script>

<header class="flex justify-between px-3 py-4 sm:px-5">
	<button type="button" class="btn btn-ringed-tertiary" on:click={() => drawerStore.close()}>
		<CloseIcon class="w-6 h-6" />
		<span>닫기</span>
	</button>

	<form
		method="POST"
		action="?/createArticle"
		use:enhance={({ data }) => {
			data.append('title', title);
			data.append('body', JSON.stringify(body ?? ''));
			coverImage && data.append('coverImage', coverImage);
			data.append('tags', tags.join());
			data.append('genre', genre);

			return async ({ update }) => {
				update();
			};
		}}
	>
		<button type="submit" class="btn variant-filled-primary">출간하기</button>
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
		<GenreSelector bind:genre />
		<p class="text-xs opacity-50 mt-2">* 적합한 장르가 없다면 기타를 선택하여 주십시오.</p>
	</li>

	<div class="h-40" />
</ul>
