<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	import PostEditor, { type PostEditorData } from '$components/Community/PostEditor.svelte';
	import type { Community } from '$lib/constants/communities';
	import { onMount } from 'svelte';
	import type { HTMLContent, JSONContent } from '@tiptap/core';
	import Seo from '$components/@utils/Seo.svelte';
	import { page } from '$app/stores';

	export let data: PageData;

	let title: string = '';
	let community: Community = 'FREE';
	let body: JSONContent | HTMLContent = '';

	let getEditorData: () => PostEditorData;

	onMount(() => {
		if (data.post) {
			title = data.post.title;
			community = data.post.community;
			body = data.post.body as JSONContent;
		}
	});

	$: postId = $page.url.searchParams.get('id');
</script>

<Seo title={data.isEditMode ? '게시글 수정' : '게시글 등록'} />

<div class="max-w-prose mx-auto px-4 py-16 md:py-20 space-y-4">
	<span class="text-3xl font-bold">커뮤니티 글쓰기</span>
	<PostEditor {body} bind:title bind:community bind:getEditorData />

	<div class="flex items-center justify-end gap-2">
		<a href="/community" class="btn variant-filled">취소</a>

		<form
			method="POST"
			action={data.isEditMode ? `?/updatePost` : '?/createPost'}
			use:enhance={({ formData }) => {
				const { title, body, community } = getEditorData();
				if (postId) {
					formData.append('postId', postId);
				}
				formData.append('title', title);
				formData.append('body', JSON.stringify(body));
				formData.append('community', community);

				return async ({ update, result }) => {
					update();
				};
			}}
		>
			<button type="submit" class="btn variant-filled-primary"
				>{data.isEditMode ? '수정' : '등록'}</button
			>
		</form>
	</div>
</div>
