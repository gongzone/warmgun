<script lang="ts">
	import { page } from '$app/stores';
	import Seo from '$components/@utils/Seo.svelte';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
</script>

<Seo title="피드" />

<main class="max-w-[700px] mx-auto py-16 md:py-20">
	<h3 class="text-7xl font-bold text-center mb-8">My Feed</h3>
	<div class="">
		<TabGroup justify="justify-center">
			<TabAnchor href="/feed" selected={$page.url.pathname === '/feed'}>
				<span>피드</span>
			</TabAnchor>
			<TabAnchor href="/feed/like" selected={$page.url.pathname === '/feed/like'}>
				<span>좋아요한 아티클</span>
			</TabAnchor>
			<TabAnchor href="/feed/following" selected={$page.url.pathname === '/feed/following'}>
				<span>구독중인 블로거</span>
			</TabAnchor>
		</TabGroup>
	</div>

	<slot />
</main>
