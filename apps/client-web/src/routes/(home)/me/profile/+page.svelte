<script lang="ts">
	import { deleteMe, findMe } from '$api/user';
	import { goto } from '$app/navigation';
	import UserAvatar from '$components/@Base/Avatar/UserAvatar.svelte';
	import { triggerComponentModal, triggerConfirmModal } from '$components/Modal/modal';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

	const queryClient = useQueryClient();

	const meQuery = createQuery({
		queryKey: ['me'],
		queryFn: findMe
	});

	const deleteMeMutation = createMutation({
		mutationFn: () => deleteMe(),
		onSuccess: () => {
			queryClient.invalidateQueries(['me']);
		}
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

	<div class="mt-20 space-y-4">
		<h3>회원 탈퇴</h3>
		<button
			class="btn variant-filled-secondary"
			on:click={() =>
				triggerConfirmModal(
					'회원 탈퇴',
					'정말로 계정을 삭제하시겠습니까? 이 행동은 돌이킬 수 없습니다!',
					(r) => {
						if (r) {
							$deleteMeMutation.mutate();
							goto('/');
						}
					}
				)}>계정 삭제</button
		>
	</div>
{/if}
