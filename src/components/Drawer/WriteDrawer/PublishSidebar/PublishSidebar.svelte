<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { enhance } from '$app/forms';
	import { drawerStore } from '@skeletonlabs/skeleton';

	import PublishHeader from './PublishHeader/PublishHeader.svelte';
	import IconText from './IconText/IconText.svelte';
	import CoverImagePreview from './CoverImagePreview/CoverImagePreview.svelte';
	import TagSelector from './TagSelector/TagSelector.svelte';

	export let coverImage: string;
	export let slug: string;
	let tags: string[];

	const dispatch = createEventDispatcher();

	onDestroy(() => {
		dispatch('close', { coverImage, slug });
	});
</script>

<form
	method="POST"
	use:enhance
	on:keypress={(e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	}}
>
	<PublishHeader />

	<ul class="space-y-10 px-8 py-8 sm:px-12 ">
		<li>
			<IconText text="대표 이미지" />
			<div class="flex flex-col justify-center items-center">
				<CoverImagePreview bind:src={coverImage} />
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

	<input type="hidden" name="title" value={$drawerStore.meta.title} hidden />
	<input type="hidden" name="subTitle" value={$drawerStore.meta.subTitle} hidden />
	<input type="hidden" name="body" value={$drawerStore.meta.body} hidden />
	<input type="hidden" name="coverImage" value={coverImage} hidden />
	{#if tags}
		<input type="hidden" name="tags" value={tags.join()} hidden />
	{/if}
</form>
