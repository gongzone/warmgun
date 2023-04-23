<script lang="ts">
	import { page } from '$app/stores';
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import ChatHeartIcon from '~icons/ri/chat-heart-line';

	import { findOneUser, follow, unfollow } from '$api/user';
	import UserAvatar from '$components/@ui/Block/UserAvatar.svelte';

	let isFollowed: boolean = false;
	let isOwner: boolean = false;

	$: blogerQuery = createQuery({
		queryKey: ['user', $page.params.page.slice(1)],
		queryFn: () => findOneUser($page.params.page.slice(1)),
		onSuccess: (data) => {
			isFollowed = data.isFollowed;
			isOwner = data.isOwner;
		}
	});

	const followMutation = createMutation({
		mutationFn: async () => {
			if ($blogerQuery.isSuccess) {
				await follow($blogerQuery.data.id);
			}
		},
		onSuccess: () => {
			isFollowed = true;
		}
	});

	const unfollowMutation = createMutation({
		mutationFn: async () => {
			if ($blogerQuery.isSuccess) {
				await unfollow($blogerQuery.data.id);
			}
		},
		onSuccess: () => {
			isFollowed = false;
		}
	});
</script>

{#if $blogerQuery.isSuccess}
	<div class="relative md:card md:py-16 md:px-20">
		<div class="md:absolute md:top-0 md:-translate-y-1/2 md:right-0 md:pr-20">
			<UserAvatar avatar={$blogerQuery.data.profile.avatar} width="w-24 md:w-28" />
		</div>

		<div class="space-y-4">
			<div class="flex flex-col gap-2">
				<span class="text-2xl font-serif font-bold">{$blogerQuery.data.profile.nickname}</span>
				<span class="text-sm text-surface-400">{$blogerQuery.data.profile.bio}</span>
			</div>

			<div class="text-sm space-x-1">
				<span class="">{$blogerQuery.data._count.articles} 아티클</span>
				<span>·</span>
				<span class="">{$blogerQuery.data._count.followedBy} 구독자</span>
				<span>·</span>
				<span class="">{$blogerQuery.data._count.following} 팔로잉</span>
			</div>

			<div class="mt-4">
				{#if !isOwner}
					{#if !isFollowed}
						<button class="chip variant-filled-primary" on:click={() => $followMutation.mutate()}>
							<span><ChatHeartIcon /></span>
							<span>구독하기</span>
						</button>
					{:else}
						<button
							class="chip variant-filled-secondary"
							on:click={() => $unfollowMutation.mutate()}
						>
							<span><ChatHeartIcon /></span>
							<span>구독취소</span>
						</button>
					{/if}
				{/if}
			</div>
		</div>
	</div>
{/if}
