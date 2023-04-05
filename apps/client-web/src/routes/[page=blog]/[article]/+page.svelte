<script lang="ts">
	import { page } from '$app/stores';
	import { createQuery } from '@tanstack/svelte-query';
	import HeartIcon from '~icons/ri/heart-2-fill';

	import { getBlogerArticle } from '$api/article';
	import { Avatar } from '@skeletonlabs/skeleton';
	import Viewer from '$components/Editor/Viewer.svelte';

	$: blogerArticleQuery = createQuery({
		queryKey: ['articles', $page.params.page.slice(1), $page.params.article],
		queryFn: () => getBlogerArticle($page.params.page.slice(1), $page.params.article)
	});
</script>

{#if $blogerArticleQuery.isSuccess}
	<main class="max-w-[760px] mx-auto py-12">
		<div class="flex justify-between mb-6">
			<div class="flex gap-2">
				<Avatar src={$blogerArticleQuery.data.author.profile.avatar ?? ''} />
				<div class="flex flex-col gap-1">
					<span class="!font-serif">{$blogerArticleQuery.data.author.profile.nickname}</span>
					<span class="!fotn-serif text-xs text-surface-400"
						>{$blogerArticleQuery.data.author.profile.bio}</span
					>
				</div>
			</div>

			<div>
				<span>Likes: {$blogerArticleQuery.data._count.likes}</span>
				<span>Comments: {$blogerArticleQuery.data._count.comments}</span>
				<span>날짜: {$blogerArticleQuery.data.createdAt}</span>
			</div>
		</div>

		<div class="flex flex-col gap-6 mb-16">
			<div class="w-full h-[478px] overflow-hidden rounded-lg">
				<img
					class="w-full h-full object-cover"
					src={$blogerArticleQuery.data.coverImage}
					alt={$blogerArticleQuery.data.title}
				/>
			</div>

			<div class="space-y-4">
				<h2 class="unstyled text-center font-bold font-serif text-3xl">
					{$blogerArticleQuery.data.title}
				</h2>
				<p class="text-center text-surface-300 font-serif">
					{$blogerArticleQuery.data.subTitle}
				</p>
			</div>
		</div>

		<div>
			<Viewer body={$blogerArticleQuery.data.body} />
		</div>
	</main>
{/if}

<div
	class="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600"
>
	<div class="grid h-full max-w-lg grid-cols-5 mx-auto">
		<button
			data-tooltip-target="tooltip-home"
			type="button"
			class="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
		>
			<HeartIcon />
			<span class="sr-only">Home</span>
		</button>
		<div
			id="tooltip-home"
			role="tooltip"
			class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
		>
			Home
			<div class="tooltip-arrow" data-popper-arrow />
		</div>
	</div>
</div>
