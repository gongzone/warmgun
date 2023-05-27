<script lang="ts">
	import { page } from '$app/stores';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import CoverImagePreview from './CoverImagePreview.svelte';
</script>

{#if $page.data.user}
	<div class="space-y-12">
		<div class="space-y-3">
			<h4 class="text-xl font-bold">기본 정보</h4>
			<div class="flex items-center justify-between card p-8">
				<div class="flex items-center gap-8">
					<UserAvatar src={$page.data.user.profile?.avatar} width="w-36" />

					<div class="flex flex-col gap-2">
						<span class="text-2xl font-bold">{$page.data.user.profile?.nickname}</span>
						<span class="opacity-75 font-thin">{$page.data.user.profile?.field}</span>
						<span class="">{$page.data.user.profile?.bio}</span>
					</div>
				</div>

				<div class="">
					<button class="btn variant-filled-primary">수정하기</button>
				</div>
			</div>
		</div>

		<div class="space-y-3">
			<h4 class="text-xl font-bold">블로그 정보</h4>
			<div class="flex items-center justify-between card p-8">
				<CoverImagePreview coverImage={$page.data.user.profile?.blogImage} />
			</div>
		</div>

		<div class="space-y-3">
			<h4 class="text-xl font-bold">소셜 링크</h4>
			<div class="flex items-center justify-between card p-8">
				<div class="flex items-center gap-8">
					<UserAvatar src={$page.data.user.profile?.avatar} width="w-36" />

					<div class="flex flex-col gap-2">
						<span class="text-2xl font-bold">{$page.data.user.profile?.nickname}</span>
						<span class="opacity-75 font-thin">{$page.data.user.profile?.field}</span>
						<span class="">{$page.data.user.profile?.bio}</span>
					</div>
				</div>

				<div class="">
					<button class="btn variant-filled-primary">수정하기</button>
				</div>
			</div>
		</div>
	</div>
{/if}
