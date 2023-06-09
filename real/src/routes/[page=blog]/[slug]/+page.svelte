<script lang="ts">
	import type { PageData } from './$types';

	import TextEditor from '$components/Editor/TextEditor.svelte';
	import ArticleDetail from './_ArticleDetail/ArticleDetail.svelte';
	import UserDisplay from '$components/User/UserDisplay/UserDisplay.svelte';
	import ArticleStatsTwo from './_ArticleStatsTwo/_ArticleStatsTwo.svelte';
	import Seo from '$components/@utils/Seo.svelte';

	export let data: PageData;
</script>

<Seo
	title={data.article.title}
	description={data.article.excerpt}
	image={data.blogUser.profile?.blogImage}
	author={data.blogUser.profile?.nickname}
	article={{
		author: data.blogUser.profile?.nickname,
		publishTime: data.article.createdAt,
		modifiedTime: data.article.updatedAt
	}}
/>

<div class="container">
	<main class="max-w-[800px] mx-auto py-12 space-y-16">
		<section class="space-y-6">
			<ArticleDetail
				blogUser={data.blogUser}
				article={data.article}
				isOwner={data.isOwner}
				isLiked={data.isLiked}
			/>
		</section>

		<section class="viewer-container">
			<TextEditor readOnly={true} body={data.article.body} />
			<ArticleStatsTwo article={data.article} isLiked={data.isLiked} />
		</section>

		<section>
			<UserDisplay user={data.blogUser} />
		</section>
	</main>
</div>
