<script lang="ts">
	import PostEditor from '$components/Community/PostEditor.svelte';
</script>

<div class="max-w-prose mx-auto py-16 md:py-20 space-y-4">
	<PostEditor />

	<div class="flex items-center justify-end gap-2">
		<button class="btn variant-filled">취소</button>
		<button class="btn variant-filled-primary">등록</button>
	</div>
</div>
