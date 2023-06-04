<script lang="ts">
	import type { PageData } from './$types';
	import { createInfiniteQuery, createQueries } from '@tanstack/svelte-query';

	import CommentContent from '$components/Comment/CommentContent.svelte';
	import CommentTextarea from '$components/Comment/CommentTextarea.svelte';
	import TextEditor from '$components/Editor/TextEditor.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import { findComments } from '$lib/client-fetch/comment';
	import type { InfiniteData } from '$lib/types/Infinite-data';
	import type { Comment } from '$lib/types/comment';
	import ArticleDetail from './_ArticleDetail/ArticleDetail.svelte';
	import UserDisplay from '$components/User/UserDisplay/UserDisplay.svelte';
	import ArticleStatsTwo from './_ArticleStatsTwo/_ArticleStatsTwo.svelte';

	export let data: PageData;
</script>

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

		<section>comment</section>

		<section>
			<UserDisplay user={data.blogUser} />
		</section>
	</main>
</div>
