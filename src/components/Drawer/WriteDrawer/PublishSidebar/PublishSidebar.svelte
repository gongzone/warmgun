<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { enhance } from '$app/forms';
	import { drawerStore } from '@skeletonlabs/skeleton';

	import PublishHeader from './PublishHeader/PublishHeader.svelte';
	import IconText from './IconText/IconText.svelte';
	import CoverImagePreview from './CoverImagePreview/CoverImagePreview.svelte';

	export let coverImage: string | null;
	export let slug: string;

	const dispatch = createEventDispatcher();

	onDestroy(() => {
		dispatch('close', { coverImage, slug });
	});
</script>

<form method="POST" use:enhance>
	<PublishHeader />

	<ul class="space-y-12 px-8 py-8 sm:px-12 ">
		<li>
			<IconText text="대표 이미지" />
			<div class="flex flex-col justify-center items-center">
				<CoverImagePreview bind:src={coverImage} />
			</div>
		</li>

		<li>
			<IconText text="Slug 설정" />
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim">/</div>
				<input type="text" name="slug" bind:value={slug} />
			</div>
		</li>
	</ul>

	<input type="hidden" name="title" value={$drawerStore.meta.title} hidden />
	<input type="hidden" name="subTitle" value={$drawerStore.meta.subTitle} hidden />
	<input type="hidden" name="body" value={$drawerStore.meta.body} hidden />
	<input type="hidden" name="coverImage" value={coverImage} hidden />
</form>
