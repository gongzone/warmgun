<script lang="ts">
	interface Article {
		title: string;
		description: string;
		body: string;
		coverImage: string | null;
		likes: number;
		views: number;
		slug: string;
		createdAt: string;
	}

	export let article: Article;
</script>

<div class="flex justify-between pt-6 px-4">
	<div class="flex flex-col gap-3">
		<a class="unstyled" href={article.slug}>
			<h3 class="!text-lg sm:!text-2xl !font-bold">{article.title}</h3>
		</a>

		<a class="unstyled" href={article.slug}>
			<p class="max-w-[90%] sm:max-w-[95%] !text-sm line-clamp-2 sm:!text-base !text-surface-300">
				{article.description}
			</p>
		</a>
	</div>

	<div
		class="min-w-[92px] min-h-[92px] w-[92px] h-[92px] sm:min-w-[112px] sm:min-h-[112px] sm:w-[112px] sm:h-[112px] overflow-hidden"
	>
		<a class="unstyled" href={article.slug}>
			<img class="aspect-square" src={article.coverImage} alt={article.title} />
		</a>
	</div>
</div>

<div class="px-4 py-2 sm:pb-3 text-secondary-400 text-sm">
	<span>좋아요 수: {article.likes}</span>
	<span>댓글 수: 12</span>
	<span>날짜: {article.createdAt}</span>
</div>
