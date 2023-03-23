<script lang="ts">
	import { page } from '$app/stores';
	import { createQuery } from '@tanstack/svelte-query';
	import ChatHeartIcon from '~icons/ri/chat-heart-line';

	import { getUserByUsername } from '$api/user';
	import { Avatar } from '@skeletonlabs/skeleton';

	$: getUserByUsernameQuery = createQuery({
		queryKey: ['user', $page.params.page.slice(1)],
		queryFn: () => getUserByUsername($page.params.page.slice(1))
	});
</script>

{#if $getUserByUsernameQuery.isSuccess}
	<section
		class="relative flex flex-col gap-2 p-8 bg-surface-800
		sm:px-12 md:px-24 lg:bg-transparent lg:px-0"
	>
		<div class="self-end">
			<Avatar width="w-20 md:w-28" src={$getUserByUsernameQuery.data.avatar ?? ''} />
		</div>

		<div class="space-y-4">
			<div class="flex flex-col gap-2">
				<span class="text-2xl font-serif font-bold">{$getUserByUsernameQuery.data.nickname}</span>
				{#if $getUserByUsernameQuery.data.bio}
					<span class="text-sm text-surface-400">{$getUserByUsernameQuery.data.bio}</span>
				{/if}
			</div>

			<div class="text-sm space-x-1">
				<span class="">{$getUserByUsernameQuery.data.articleCount} 아티클</span>
				<span>·</span>
				<span class="">{$getUserByUsernameQuery.data.followedByCount} 구독자</span>
				<span>·</span>
				<span class="">{$getUserByUsernameQuery.data.followingCount} 팔로잉</span>
			</div>

			<div class="mt-4">
				<span class="chip variant-filled-primary">
					<span><ChatHeartIcon /></span>
					<span>구독하기</span>
				</span>
			</div>
		</div>
	</section>
{/if}
