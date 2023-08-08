<script lang="ts">
	import { page } from '$app/stores';
	import Seo from '$components/@utils/Seo.svelte';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';

	$: settingTitle =
		$page.url.pathname === '/settings'
			? '프로필 설정'
			: $page.url.pathname === '/settings/blog'
			? '블로그 설정'
			: '계정 설정';
</script>

<Seo title="설정" />

<main class="container max-w-[700px] mx-auto py-16 md:py-20">
	<div class="space-y-6 mb-8">
		<h3 class="text-4xl font-bold">{settingTitle}</h3>
		<TabGroup>
			<TabAnchor href="/setting" selected={$page.url.pathname === '/setting'}>
				<span>프로필</span>
			</TabAnchor>
			<TabAnchor href="/setting/blog" selected={$page.url.pathname === '/setting/blog'}>
				<span>블로그</span>
			</TabAnchor>
			<TabAnchor href="/setting/account" selected={$page.url.pathname === '/setting/account'}>
				<span>계정</span>
			</TabAnchor>
		</TabGroup>
	</div>

	<slot />
</main>
