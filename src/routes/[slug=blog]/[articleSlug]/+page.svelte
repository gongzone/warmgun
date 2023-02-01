<script lang="ts">
	import type { PageData } from './$types';
	import { Viewer } from 'bytemd';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data: PageData;

	let blogUser = data.blogUser;
	let article = data.article;
</script>

<div class="flex justify-between mb-6">
	<div class="flex gap-2">
		<Avatar src={blogUser.avatarUrl} />
		<div class="flex flex-col gap-1">
			<span class="!font-serif">{blogUser.name}</span>
			<span class="!fotn-serif text-xs text-surface-400">{blogUser.class}</span>
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
		<h2 class="text-center font-bold">{article?.title}</h2>
		<p class="text-center text-surface-300 font-serif">{article?.description}</p>
	</div>
</div>

<div>
	<Viewer value={article?.body} />
</div>
