<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import CloseIcon from '~icons/ri/close-line';

	import type { PublishMeta } from '$components/@ui-singletons/Drawer/drawer';
	import IconText from './_IconText/IconText.svelte';
	import CoverImagePreview from './_CoverImagePreview/CoverImagePreview.svelte';
	import TagSelector from './_TagSelector/TagSelector.svelte';

	let coverImage: string | null;
	let tags: string[];

	$: ({ title, subTitle, body } = $drawerStore.meta as PublishMeta);

	$: console.log(tags);
</script>

<header class="flex justify-between px-3 sm:px-5 py-4">
	<button type="button" class="btn btn-ringed-tertiary" on:click={() => drawerStore.close()}>
		<CloseIcon class="w-6 h-6" />
		<span>닫기</span>
	</button>

	<form
		method="POST"
		action="?/publish"
		use:enhance={({ data }) => {
			console.log('?');
			data.append('title', title);
			data.append('subTitle', subTitle);
			data.append('body', JSON.stringify(body));
			coverImage && data.append('coverImage', coverImage);
			data.append('tags', tags.join());

			return async ({ result }) => {
				await applyAction(result);
			};
		}}
	>
		<button type="submit" class="btn variant-filled-primary">출간하기</button>
	</form>
</header>

<hr />

<ul class="space-y-10 px-8 py-8 sm:px-12">
	<li>
		<IconText text="커버 이미지" />
		<CoverImagePreview bind:coverImage />
	</li>

	<li>
		<IconText text="태그 선택" />
		<TagSelector bind:tags />
	</li>

	<div class="h-40" />
</ul>
