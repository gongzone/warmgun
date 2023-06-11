<script lang="ts">
	import type { ActionData } from './$types';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	import { triggerToast } from '$components/@ui/Toast/toast';
	import CoverImagePreview from '../CoverImagePreview.svelte';

	export let form: ActionData;

	let coverImage: string | null | undefined = $page.data.user?.profile?.blogImage;

	$: if (form?.message) {
		triggerToast(`${form.isSuccess ? 'success' : 'warning'}`, form.message);
	}
</script>

{#if $page.data.user}
	<form
		method="POST"
		use:enhance={({ data }) => {
			coverImage && data.append('blogImage', coverImage);

			return async ({ update }) => {
				update({ reset: false });
			};
		}}
	>
		<div class="mb-8">
			<span class="block mb-3 text-sm opacity-75">블로그 대표 이미지</span>
			<CoverImagePreview bind:coverImage />
		</div>

		<button type="submit" class="btn variant-filled-primary">수정하기</button>
	</form>
{/if}
