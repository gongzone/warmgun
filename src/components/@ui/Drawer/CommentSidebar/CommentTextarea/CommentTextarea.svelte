<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AutosizeTextarea from '$components/@ui/AutosizeTextarea.svelte';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { useQueryClient } from '@tanstack/svelte-query';

	export let isEditingMode: boolean = false;
	export let commentId: number | null = null;
	export let mode: 'article' | 'post' = 'article';
	export let id: number;
	export let parentId: number | null;
	export let userDisplay: boolean = true;
	export let cb: any = undefined;
	export let content: string = '';

	const queryClient = useQueryClient();
</script>

<div class="space-y-4">
	{#if $page.data.user && userDisplay}
		<div class="flex items-center gap-2">
			<UserAvatar src={$page.data.user.profile?.avatar} width="w-10" />
			<span class="text-sm font-bold">{$page.data.user.profile?.nickname}</span>
		</div>
	{/if}
	<div class="flex flex-col border border-surface-500 rounded-lg p-2 bg-surface-900">
		<div class="min-h-[108px] rounded-t-lg">
			<AutosizeTextarea
				name="comment"
				placeholder="댓글을 입력하세요"
				bind:value={content}
				size="sm"
			/>
		</div>
		<div class="flex justify-end px-4 py-2">
			{#if !isEditingMode}
				<form
					method="POST"
					action="?/createComment"
					use:enhance={({ formElement, formData, action, cancel, submitter }) => {
						if (!$page.data.user) {
							cancel();
							drawerStore.close();
							return goto('/auth/login');
						}

						return async ({ result, update }) => {
							await queryClient.invalidateQueries({ queryKey: ['comments', mode, id, null] });
							cb && cb();
							update();
						};
					}}
				>
					<input type="hidden" name="mode" value={mode} />
					<input type="hidden" name="id" value={id} />
					<input type="hidden" name="parentId" value={parentId} />
					<input type="hidden" name="content" value={content} />
					<button type="submit" class="btn variant-filled-primary text-sm">댓글 달기</button>
				</form>
			{:else}
				<form
					method="POST"
					action="?/editComment"
					class="space-x-2"
					use:enhance={({ formElement, formData, action, cancel, submitter }) => {
						if (!$page.data.user) {
							cancel();
							drawerStore.close();
							return goto('/auth/login');
						}

						return async ({ result, update }) => {
							await queryClient.invalidateQueries({ queryKey: ['comments', mode, id, parentId] });
							cb && cb();
							update();
						};
					}}
				>
					<input type="hidden" name="commentId" value={commentId} />
					<input type="hidden" name="content" value={content} />
					<button type="button" class="btn variant-filled text-sm" on:click>취소</button>
					<button type="submit" class="btn variant-filled-primary text-sm">수정하기</button>
				</form>
			{/if}
		</div>
	</div>
</div>
