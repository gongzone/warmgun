<script lang="ts">
	import { formatDate } from '$lib/utils/date';

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
	<header>
		<img src={article.coverImage} class="bg-black/50 w-full aspect-[21/9]" alt="Post" />
	</header>

	<div class="p-4 space-y-4">
		<div class="flex items-center gap-2">
			<h6 class="text-primary-500">Announcements</h6>
			<span class="divider-vertical h-6" />
			<small>On {formatDate(article.date)}</small>
		</div>
		<h3>{article.title}</h3>
		<p class="line-clamp-3">
			{article.subTitle}
		</p>

		<div class="flex flex-wrap items-center gap-2">
			<span class="chip variant-ghost-surface">React</span>
			<span class="chip variant-ghost-surface">JavaScript</span>
			<span class="chip variant-ghost-surface">Programming</span>
			<span class="chip variant-ghost-surface">Programming</span>
		</div>
	</div>

	<footer
		class="p-4 flex justify-start items-center space-x-4 border-t border-t-surface-500 mt-auto "
	>
		<figure
			class="avatar flex aspect-square text-surface-50 font-semibold justify-center items-center overflow-hidden isolate bg-surface-400-500-token w-12  rounded-full   "
			data-testid="avatar"
		>
			<img
				class="avatar-image w-full h-full object-cover"
				style=""
				src={article.writerAvatar}
				alt=""
			/>
		</figure>

		<div class="flex-auto flex justify-between items-center">
			<h6 class="font-bold">{article.writerName}</h6>

			<div class="flex items-center self-end gap-4">
				<div class="flex items-center gap-1">
					<i class="ri-heart-2-fill ri-lg text-secondary-500" />
					<span class="text-sm">1.1k</span>
				</div>

				<div class="flex items-center gap-1">
					<i class="ri-message-3-fill ri-lg" />
					<span class="text-sm">24</span>
				</div>
			</div>
		</div>
	</footer>
</div>
