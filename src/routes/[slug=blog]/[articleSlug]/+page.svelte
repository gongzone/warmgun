<script lang="ts">
	import type { PageData } from './$types';
	import { Avatar } from '@skeletonlabs/skeleton';

	import Viewer from './_Viewer/_Viewer.svelte';

	export let data: PageData;

	let bloger = data.bloger;
	let article = data.article;
</script>

<div class="flex justify-between mb-6">
	<div class="flex gap-2">
		<Avatar src={bloger.avatar ?? '/avatars/monkey.svg'} />
		<div class="flex flex-col gap-1">
			<span class="!font-serif">{bloger.nickname}</span>
			<span class="!fotn-serif text-xs text-surface-400">{bloger.description}</span>
		</div>
	</div>

	<div>
		<span>좋아요</span>
		<span>views</span>
		<span>날짜</span>
	</div>
</div>

<div class="flex flex-col gap-6 mb-16">
	<div class="w-full h-[478px] overflow-hidden rounded-lg">
		<img class="w-full h-full object-cover" src={article?.coverImage} alt={article?.title} />
	</div>

	<div class="space-y-4">
		<h2 class="unstyled text-center font-bold font-serif text-3xl">{article?.title}</h2>
		<p class="text-center text-surface-300 font-serif">{article?.subTitle}</p>
	</div>
</div>

<div>
	<Viewer body={article?.body} />
</div>
