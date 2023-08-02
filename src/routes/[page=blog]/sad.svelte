<!-- <script lang="ts">
	import Seo from '$components/@utils/Seo.svelte';
	import type { PageData } from './$types';

	import BlogHero from './_BlogHero/BlogHero.svelte';
	import BlogTab from './_BlogTab/BlogTab.svelte';

	export let data: PageData;
</script>

<Seo
	title={data.blogUser.profile?.nickname}
	description={data.blogUser.profile?.bio}
	image={data.blogUser.profile?.blogImage}
	author={data.blogUser.profile?.nickname}
/>

<BlogHero blogUser={data.blogUser} isOwner={data.isOwner} isFollowing={data.isFollowing} />

<div class="page-container !pt-14">
	<main class="space-y-8">
		<BlogTab />
		<div class="min-h-[200px]">
			<slot />
		</div>
	</main>
</div> -->
