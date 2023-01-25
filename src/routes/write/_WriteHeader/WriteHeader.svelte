<script lang="ts">
	import { base } from '$app/paths';
	import { afterNavigate } from '$app/navigation';
	import { drawerStore } from '@skeletonlabs/skeleton';

	let previousPage: string = base;

	function openWriterSidebar() {
		drawerStore.open();
	}

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<header class="flex justify-between p-5">
	<div>
		<a href={previousPage} class="btn-icon"><i class="ri-arrow-left-line ri-lg" /></a>
		<button class="btn-icon variant-ghost-surface" on:click={openWriterSidebar}
			><i class="ri-article-line ri-lg" /></button
		>
	</div>

	<div class="flex gap-4">
		<button class="btn variant-filled-secondary btn-base">저장</button>
		<button class="btn variant-filled-primary btn-base">글 등록</button>
	</div>
</header>
