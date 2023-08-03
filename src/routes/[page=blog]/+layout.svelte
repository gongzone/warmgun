<script lang="ts">
	import type { LayoutData } from './$types';
	import Image from '$components/@ui/Image.svelte';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import Separator from '$components/@ui/Separator.svelte';
	import { siteConfig } from '$lib/configs/site';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import ArticleIcon from '$components/@icons/ArticleIcon.svelte';
	import GenreIcon from '$components/@icons/GenreIcon.svelte';

	export let data: LayoutData;

	const taps = [
		{ title: '아티클', icon: ArticleIcon, slug: '' },
		{ title: '커뮤니티', icon: GenreIcon, slug: '/community' }
	];

	$: ({ blogUser } = data);

	$: console.log(blogUser);
</script>

<div class="max-w-[700px] mx-auto">
	<div class="border-l border-r border-l-surface-600 border-r-surface-600">
		<div class="relative w-full h-[200px]">
			{#if blogUser.profile?.blogImage}
				<Image src={blogUser.profile.blogImage} alt="blog-cover" />
			{:else}
				<div class="w-full h-full bg-surface-800" />
			{/if}
			<div class="flex items-center justify-center">
				<div class="absolute flex left-6 bottom-0 translate-y-1/2">
					<UserAvatar
						src={blogUser.profile?.avatar}
						width="w-32"
						border="border-4 border-surface-900-50-token"
					/>
				</div>
			</div>
		</div>

		<div class="h-[82px]" />

		<div class="px-6">
			<div class="flex items-center self-end gap-2 ml-1 mb-1">
				<span class="text-2xl font-semibold">{blogUser.profile?.nickname}</span>
				<span class="badge variant-filled">{blogUser.profile?.field}</span>
			</div>

			<div class="flex gap-8">
				<p class="font-light">{blogUser.profile?.bio}</p>
			</div>

			<div class="flex items-center gap-2 text-sm mt-3">
				<div>
					<span class="font-semibold">{blogUser._count.followedBy}</span>
					<span class="font-light">구독자</span>
				</div>
				<span>·</span>
				<div>
					<span class="font-semibold">{blogUser._count.following}</span>
					<span class="font-light">팔로잉</span>
				</div>
				<span>·</span>
				<div>
					<span class="font-semibold">{blogUser._count.articles}</span>
					<span class="font-light">아티클</span>
				</div>
			</div>

			<div class="flex items-center gap-2 justify-end">
				{#each siteConfig.socials as social (social.title)}
					{#if blogUser.profile?.profileLinks?.[social.enum]}
						<a href={blogUser.profile?.profileLinks?.[social.enum]}>
							<svelte:component this={social.icon} class="w-6 h-6" />
						</a>
					{/if}
				{/each}
			</div>
		</div>

		<div class="my-6" />

		<TabGroup justify="justify-center">
			{#each taps as tap (tap.title)}
				<TabAnchor
					href="/@{blogUser.username}{tap.slug}"
					selected={$page.url.pathname === `/@${blogUser.username}${tap.slug}`}
				>
					<div class="flex items-center gap-2">
						<span><svelte:component this={tap.icon} class="w-5 h-5" /></span>
						<span>{tap.title}</span>
					</div>
				</TabAnchor>
			{/each}
		</TabGroup>
	</div>

	<slot />
</div>
