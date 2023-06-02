<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { triggerConfirmModal } from '$components/@ui/Modal/modal';

	let deleteForm: HTMLFormElement;
</script>

{#if $page.data.user}
	<form method="POST" bind:this={deleteForm} use:enhance>
		<div class="card p-5">
			<div class="space-y-2">
				<span class="block text-lg text-warning-600">회원 탈퇴</span>
				<p class="font-thin">
					회원 탈퇴를 진행한 후에는 귀하가 작성한 모든 데이터가 삭제됩니다. 이 행동은 돌이킬 수
					없으므로 신중이 결정하시길 바랍니다.
				</p>
			</div>
			<div class="flex justify-end mt-3">
				<button
					type="button"
					class="btn variant-filled-error"
					on:click={() =>
						triggerConfirmModal('회원 탈퇴', '정말로 탈퇴하시겠습니까?', (confirm) => {
							if (confirm) deleteForm.requestSubmit();
						})}>탈퇴하기</button
				>
			</div>
		</div>
	</form>
{/if}
