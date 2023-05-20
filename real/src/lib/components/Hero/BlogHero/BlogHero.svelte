<script lang="ts">
	import UserAvatar from '$lib/components/@ui/UserAvatar.svelte';

	import type { BlogUser } from '$lib/types/user';
	import HeartIcon from '$lib/components/@icons/HeartIcon.svelte';
	import FollowingIcon from '$lib/components/@icons/FollowingIcon.svelte';
	import ArticleIcon from '$lib/components/@icons/ArticleIcon.svelte';

	export let blogUser: BlogUser;
</script>

<div class="">
	<div class="min-h-[400px] w-full">
		<div class="container grid grid-cols-1 gap-9 py-12 lg:grid-cols-2">
			<div class="max-w-[650px]">
				<div class="space-y-2">
					<div class="flex gap-6">
						<UserAvatar src={blogUser.profile?.avatar} width="w-[168px]" />
					</div>
					<h3 class="text-primary items-end text-5xl font-bold">{blogUser.profile?.nickname}</h3>
					<div class="flex flex-col gap-1">
						<span class="text-2xl font-extralight">{blogUser.profile?.field}</span>
						<p class="line-clamp-4 break-all text-base font-thin">
							{blogUser.profile?.bio}
						</p>
					</div>
					<button class="btn variant-filled-primary">구독하기</button>
				</div>

				<div class="mt-4 flex items-center gap-6">
					<div class="relative inline-flex flex-col rounded-md border p-4">
						<span class="variant-filled absolute -left-3 -top-3 rounded-full p-2">
							<HeartIcon class="h-4 w-4" />
						</span>
						<span class="text-sm font-extralight">구독자</span>
						<span class="text-sm">{blogUser._count.followedBy}</span>
					</div>
					<div class="relative inline-flex flex-col rounded-md border p-4">
						<span class="variant-filled absolute -left-3 -top-3 rounded-full p-2">
							<FollowingIcon class="h-4 w-4" />
						</span>
						<span class="text-sm font-extralight">팔로잉</span>
						<span class="text-sm">{blogUser._count.following}</span>
					</div>
					<div class="relative inline-flex flex-col rounded-md border p-4">
						<span class="variant-filled absolute -left-3 -top-3 rounded-full p-2">
							<ArticleIcon class="h-4 w-4" />
						</span>
						<span class="text-sm font-extralight">아티클</span>
						<span class="text-sm">{blogUser._count.articles}</span>
					</div>
				</div>
			</div>

			<div class="space-y-3">
				<div
					class="absolute left-0 top-0 -z-50 w-screen brightness-[0.17] lg:static lg:w-full lg:brightness-100"
				>
					<div class="h-[420px] overflow-hidden rounded-2xl shadow-xl">
						<img
							src="https://picsum.photos/id/2/1240/800"
							alt="blog-cover"
							class="h-full w-full rounded-xl object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="relative flex gap-4">
			<div class="bg-primary absolute right-0 top-[50%] h-4 w-4 -translate-y-1/2 rounded-full" />
			<div class="border-b-foreground absolute top-0 -z-50 h-[50%] w-full border-b" />
			소셜 링크스
		</div>
	</div>
</div>
