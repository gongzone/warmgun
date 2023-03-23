<script lang="ts">
	import ArticleCardHeader from './ArticleCardHeader/ArticleCardHeader.svelte';
	import ArticleCardContent from './ArticleCardContent/ArticleCardContent.svelte';
	import ArticleCardTags from './ArticleCardTags/ArticleCardTags.svelte';
	import ArticleCardFooter from './ArticleCardFooter/ArticleCardFooter.svelte';
</script>

<div class="card flex flex-col overflow-hidden">
	<ArticleCardHeader coverImage={'https://source.unsplash.com/random/1280x540?skeleton'} />
	<ArticleCardContent
		title={'타입스크립트 명확하기 알기 위한 튜토리얼 1'}
		subTitle={'당신의 꿈을 펼치세요.'}
		date={new Date()}
	/>
	<ArticleCardTags tags={[{ name: 'React' }, { name: 'Sveltekit' }]} />
	<ArticleCardFooter
		writerAvatar={'https://i.pravatar.cc/160?img=36'}
		writerName={'Alex'}
		likesCount={30}
		commentsCount={8}
	/>
</div>
