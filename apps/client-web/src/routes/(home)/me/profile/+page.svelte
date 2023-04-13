<script lang="ts">
	import { findMe } from '$api/user';
	import UserAvatar from '$components/@Base/Avatar/UserAvatar.svelte';
	import { triggerComponentModal } from '$components/Modal/modal';
	import { createQuery } from '@tanstack/svelte-query';

	const meQuery = createQuery({
		queryKey: ['me'],
		queryFn: findMe
	});
</script>

{#if $meQuery.data}
	<div class="space-y-4">
		<h3>기본 정보</h3>
		<div class="flex justify-between gap-4 card p-12">
			<div>
				<UserAvatar avatar={$meQuery.data.profile.avatar} width="w-32" />
				<div class="space-y-2">
					<span class="font-bold text-3xl">{$meQuery.data.profile.nickname}</span>
					<p>{$meQuery.data.profile.bio}</p>
				</div>
			</div>
			<div class="">
				<button
					class="btn variant-filled"
					on:click={() =>
						triggerComponentModal('editProfileModal', {
							nickname: $meQuery.data?.profile.nickname,
							bio: $meQuery.data?.profile.bio,
							avatar: $meQuery.data?.profile.avatar
						})}>수정하기</button
				>
			</div>
		</div>
	</div>
{/if}
