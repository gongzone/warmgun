<script lang="ts">
	import { enhance } from '$app/forms';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';

	import type { BlogUser } from '$lib/types/user';
	import { siteConfig } from '$lib/configs/site';

	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import FollowingIcon from '$components/@icons/FollowingIcon.svelte';
	import ArticleIcon from '$components/@icons/ArticleIcon.svelte';
	import Image from '$components/@ui/Image.svelte';

	export let blogUser: BlogUser;
	export let isOwner: boolean;
	export let isFollowing: boolean;
</script>

<div class="">
	<div class="min-h-[400px] w-full">
		<div class="grid grid-cols-1 gap-9 pb-6 lg:grid-cols-2 relative">
			<div class="max-w-[650px]">
				<div class="">
					<div class="space-y-2">
						<div class="flex gap-6">
							<UserAvatar src={blogUser.profile?.avatar} width="w-[168px]" />
						</div>
						<h3 class="text-4xl font-bold">{blogUser.profile?.nickname}</h3>
						<div class="flex flex-col gap-1">
							<span class="text-xl font-thin">{blogUser.profile?.field}</span>
						</div>
					</div>

					<div class="mt-6 flex items-center gap-6">
						<div class="relative inline-flex flex-col rounded-lg border border-surface-300 p-4">
							<span class="variant-filled absolute -left-3 -top-3 rounded-full p-2">
								<HeartIcon class="h-4 w-4" />
							</span>
							<span class="text-sm font-extralight">구독자</span>
							<span class="text-sm">{blogUser._count.followedBy}</span>
						</div>
						<div class="relative inline-flex flex-col rounded-lg border border-surface-300 p-4">
							<span class="variant-filled absolute -left-3 -top-3 rounded-full p-2">
								<FollowingIcon class="h-4 w-4" />
							</span>
							<span class="text-sm font-extralight">팔로잉</span>
							<span class="text-sm">{blogUser._count.following}</span>
						</div>
						<div class="relative inline-flex flex-col rounded-lg border border-surface-300 p-4">
							<span class="variant-filled absolute -left-3 -top-3 rounded-full p-2">
								<ArticleIcon class="h-4 w-4" />
							</span>
							<span class="text-sm font-extralight">아티클</span>
							<span class="text-sm">{blogUser._count.articles}</span>
						</div>
					</div>

					<div class="mt-6">
						<form method="POST" use:enhance class="min-h-[38px]">
							<input type="hidden" name="blogUserId" value={blogUser.id} />
							{#if !isOwner}
								{#if !isFollowing}
									<button
										type="submit"
										formaction="?/follow"
										class="btn variant-filled-primary text-sm">구독하기</button
									>
								{:else}
									<button
										type="submit"
										formaction="?/unFollow"
										class="btn variant-filled-primary text-sm">구독취소</button
									>
								{/if}
							{:else}
								<a href="/settings" class="btn variant-filled-primary text-sm">프로필 설정</a>
							{/if}
						</form>
					</div>
				</div>
			</div>

			<div class="space-y-3">
				<div
					class="absolute left-0 top-0 -z-50 w-screen brightness-[0.17] lg:static lg:w-full lg:brightness-100"
				>
					<div class="h-[350px] lg:h-[420px] overflow-hidden shadow-xl lg:rounded-xl">
						{#if blogUser.profile?.blogImage}
							<Image
								src={`${blogUser.profile?.blogImage}?w=1240&h=800&q=80&f=webp`}
								alt="blog-cover"
								class="h-full w-full object-cover"
							/>
						{:else}
							<div class="bg-surface-800 h-full w-full rounded-xl object-cover hidden lg:block" />
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="">
		<div class="relative flex gap-3 min-h-[43px]">
			<div
				class="bg-primary-600 absolute right-0 top-[50%] h-4 w-4 -translate-y-1/2 rounded-full hidden min-[385px]:block"
			/>
			<div
				class="bg-secondary-600 absolute right-[25px] top-[50%] h-4 w-4 -translate-y-1/2 rounded-full hidden min-[385px]:block"
			/>
			<div
				class="bg-tertiary-600 absolute right-[50px] top-[50%] h-4 w-4 -translate-y-1/2 rounded-full hidden min-[385px]:block"
			/>

			{#each siteConfig.socials as social (social.title)}
				{#if blogUser.profile?.profileLinks?.[social.enum]}
					<a
						href={blogUser.profile?.profileLinks?.[social.enum]}
						class="btn-icon variant-ringed-tertiary"
					>
						<svelte:component this={social.icon} />
					</a>
				{/if}
			{/each}
		</div>
	</div>
</div>
