<script lang="ts">
	import { enhance } from '$app/forms';
	import PostEditor, { type PostEditorData } from '$components/Community/PostEditor.svelte';

	let getEditorData: () => PostEditorData;
</script>

<div class="max-w-prose mx-auto py-16 md:py-20 space-y-4">
	<span class="text-3xl font-bold">커뮤니티 글쓰기</span>
	<PostEditor bind:getEditorData />

	<div class="flex items-center justify-end gap-2">
		<a href="/communty" class="btn variant-filled">취소</a>

		<form
			method="POST"
			action="?/createPost"
			use:enhance={({ data }) => {
				const { title, body, community } = getEditorData();
				data.append('title', title);
				data.append('body', JSON.stringify(body));
				data.append('community', community);

				return async ({ update, result }) => {
					update();
				};
			}}
		>
			<button type="submit" class="btn variant-filled-primary">등록</button>
		</form>
	</div>
</div>
