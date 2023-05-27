<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import type { PageData, PageServerData } from './$types';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import MoreIcon from '$components/@icons/MoreIcon.svelte';

	import { Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import TextEditor from '$components/Editor/TextEditor.svelte';
	// import Comment from '$components/Comment/Comment.svelte';
	import { triggerConfirmModal } from '$components/@ui/Modal/modal';
	import { enhance } from '$app/forms';

	export let data: PageData;

	let popupSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click | focus | focus-click
		event: 'click',
		placement: 'bottom',
		// Provide a matching 'data-popup' value.
		target: 'examplePopup'
	};
</script>

<main class="max-w-[760px] mx-auto py-12">
	<div class="flex justify-between items-center mb-6">
		<div class="flex gap-2">
			<UserAvatar src={data.blogUser.profile?.avatar} />
			<div class="flex flex-col gap-1">
				<span class="!font-serif">{data.blogUser.profile?.nickname}</span>
				<span class="!fotn-serif text-xs text-surface-400">{data.blogUser.profile?.field}</span>
			</div>
		</div>

		<div class="flex items-center gap-4">
			<form method="POST" use:enhance class="flex items-center gap-1">
				<input type="hidden" name="articleId" value={data.article.id} />
				{#if !data.isLiked}
					<button type="submit" formaction="?/like" class="">
						<HeartIcon class="w-6 h-6" />
					</button>
				{:else}
					<button type="submit" formaction="?/unlike" class="">
						<HeartIcon class="w-6 h-6 text-red-500" />
					</button>
				{/if}
				<span>{data.article._count.likes}</span>
			</form>
			{#if data.isOwner}
				<button class="btn-icon variant-ringed-tertiary" use:popup={popupSettings}>
					<MoreIcon />
				</button>
				<div class="card p-4" data-popup="examplePopup">
					<ul class="list">
						<li>
							<a href={`/write/${data.article.id}?mode=edit`}>수정하기</a>
						</li>
						<li>
							<button
								on:click={() =>
									triggerConfirmModal(
										'아티클 삭제',
										'정말로 삭제하시겠습니까? 이 행동은 돌이킬 수 없습니다!',
										(confirm) => {
											if (confirm) {
											}
										}
									)}>삭제하기</button
							>
						</li>
					</ul>
					<!-- Append the arrow element -->
					<div class="arrow bg-surface-800" />
				</div>
			{/if}
		</div>
	</div>

	<div class="flex flex-col gap-6 mb-16">
		<div class="w-full h-[478px] overflow-hidden rounded-lg">
			<img
				class="w-full h-full object-cover"
				src={data.article.coverImage}
				alt={data.article.title}
			/>
		</div>

		<div class="space-y-4">
			<h2 class="unstyled text-center font-bold font-serif text-3xl">
				{data.article.title}
			</h2>
		</div>
	</div>

	<div class="viewer-container">
		<TextEditor readOnly={true} body={data.article.body} />
	</div>

	<div class="mt-32 space-y-6">
		<span class="font-bold text-2xl">{0}개의 댓글</span>
		<!-- <Comment articleId={$blogerArticleQuery.data.id} /> -->
	</div>
</main>
