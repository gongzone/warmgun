<script lang="ts">
	import { base } from '$app/paths';
	import { afterNavigate } from '$app/navigation';

	import { drawerOpen } from '$components/Drawer/Drawer';

	let previousPage: string = base;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<header class="flex justify-between p-5">
	<div>
		<a href={previousPage} class="btn-icon"><i class="ri-arrow-left-line ri-lg" /></a>
		<button class="btn-icon btn-ghost-surface" on:click={() => drawerOpen('write')}
			><i class="ri-article-line ri-lg" /></button
		>
	</div>
	<button class="btn btn-filled-primary btn-base">글 등록</button>
</header>
