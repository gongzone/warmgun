<script lang="ts">
	import ArticleCardHeader from './ArticleCardHeader/ArticleCardHeader.svelte';
	import ArticleCardContent from './ArticleCardContent/ArticleCardContent.svelte';
	import ArticleCardTags from './ArticleCardTags/ArticleCardTags.svelte';
	import ArticleCardFooter from './ArticleCardFooter/ArticleCardFooter.svelte';

	interface Article {
		coverImage: string;
		title: string;
		subTitle: string;
		writerAvatar: string;
		writerName: string;
		date: Date;
	}

	export let article: Article;
</script>

<div class="card flex flex-col overflow-hidden">
	<ArticleCardHeader coverImage={article.coverImage} />
	<ArticleCardContent title={article.title} subTitle={article.subTitle} date={article.date} />
	<ArticleCardTags tags={[{ name: 'React' }, { name: 'Sveltekit' }]} />
	<!-- <ArticleCardFooter writerAvatar={article.writerAvatar} writerName={article.writerName} likesCount={} commentsCount={} /> -->
</div>
