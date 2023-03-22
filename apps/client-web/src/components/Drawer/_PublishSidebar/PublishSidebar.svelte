<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import CloseIcon from '~icons/ri/close-line';

	import IconText from './IconText/IconText.svelte';
	import CoverImagePreview from './CoverImagePreview/CoverImagePreview.svelte';
	import TagSelector from './TagSelector/TagSelector.svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import { createArticle } from '$api/article';
	import type { OutputData } from '@editorjs/editorjs';

	export let coverImage: string | null;
	export let slug: string;
	export let tags: string[];

	const createArticleMutation = createMutation({
		mutationFn: async () => {
			const createArticleDTO = {
				title: $drawerStore.meta.title as string,
				subTitle: $drawerStore.meta.subTitle as string,
				body: $drawerStore.meta.body as OutputData,
				coverImage,
				slug: `/${slug}`,
				tags
			};

			await createArticle(createArticleDTO);
		}
	});

	const dispatch = createEventDispatcher();

	onDestroy(() => {
		dispatch('close', { coverImage, slug });
	});
</script>

<header class="flex justify-between px-3 sm:px-5 py-4">
	<button type="button" class="btn btn-ringed-tertiary" on:click={() => drawerStore.close()}>
		<span><CloseIcon class="w-[24px] h-[24px]" /></span>
		<span>닫기</span>
	</button>

	<button
		type="button"
		class="btn variant-filled-primary"
		on:click={() => $createArticleMutation.mutate()}
	>
		출간하기
	</button>
</header>

<hr />

<ul class="space-y-10 px-8 py-8 sm:px-12 ">
	<li>
		<IconText text="대표 이미지" />
		<div class="flex flex-col justify-center items-center">
			<CoverImagePreview bind:coverImage />
		</div>
	</li>

	<li>
		<IconText text="태그 선택" />
		<TagSelector bind:tags />
	</li>

	<li>
		<IconText text="Slug 설정" />
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-md">
			<div class="input-group-shim">/</div>
			<input type="text" name="slug" bind:value={slug} />
		</div>
	</li>

	<div class="h-40" />
</ul>
