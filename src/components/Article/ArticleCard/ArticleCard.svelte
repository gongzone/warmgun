<script lang="ts">
	import type { PageServerData } from '../../../routes/(app)/$types';

	import ArticleCardHeader from './ArticleCardHeader/ArticleCardHeader.svelte';
	import ArticleCardContent from './ArticleCardContent/ArticleCardContent.svelte';
	import ArticleCardTags from './ArticleCardTags/ArticleCardTags.svelte';
	import ArticleCardFooter from './ArticleCardFooter/ArticleCardFooter.svelte';

	export let article: any;
</script>

<div class="card flex flex-col overflow-hidden">
	<ArticleCardHeader coverImage={article.coverImage} />
	<ArticleCardContent title={article.title} subTitle={article.subTitle} date={article.createdAt} />
	<ArticleCardTags tags={[{ name: 'React' }, { name: 'Sveltekit' }]} />
	<ArticleCardFooter
		writerAvatar={article.writerAvatar}
		writerName={article.writerName}
		likesCount={article._count.likes}
		commentsCount={article._count.comments}
	/>
</div>
