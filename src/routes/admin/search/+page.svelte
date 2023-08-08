<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

<div class="space-y-12">
	<section class="space-y-3">
		<span class="text-2xl font-bold">Indexes</span>
		<ul class="flex flex-wrap items-center gap-2">
			{#each data.indexes as searchIndex (searchIndex)}
				<li>
					<form method="POST" action="?/deleteIndex" use:enhance>
						<input type="hidden" name="uid" value={searchIndex} />
						<button type="submit" class="badge variant-filled">{searchIndex}</button>
					</form>
				</li>
			{/each}
		</ul>

		<form method="POST" action="?/createIndex" class="space-x-2" use:enhance>
			<input
				class="input max-w-[300px]"
				name="indexName"
				type="text"
				placeholder="추가할 인덱스를 입력하세요."
			/>
			<button type="submit" class="btn variant-filled-primary">추가하기</button>
		</form>
	</section>

	<section class="space-y-3">
		<span class="text-2xl font-bold">Documents</span>
		<div class="text-lg font-bold opacity-75">Articles</div>
		<ul class="flex flex-wrap items-center gap-2">
			{#each data.articles as article (article.id)}
				<li>
					<form method="POST" action="?/deleteDocument" use:enhance>
						<input type="hidden" name="indexName" value="articles" />
						<input type="hidden" name="id" value={article.id} />
						<button type="submit" class="badge variant-filled">{article.title}</button>
					</form>
				</li>
			{/each}
		</ul>
		<form method="POST" action="?/updateArticleSettings">
			<button type="submit" class="btn variant-filled-secondary">아티클 검색 설정 업데이트</button>
		</form>

		<div class="text-lg font-bold opacity-75">Tags</div>
		<ul class="flex flex-wrap items-center gap-2">
			{#each data.tags as tag (tag.id)}
				<li>
					<form method="POST" action="?/deleteDocument" use:enhance>
						<input type="hidden" name="indexName" value="tags" />
						<input type="hidden" name="id" value={tag.id} />
						<button type="submit" class="badge variant-filled">{tag.name}</button>
					</form>
				</li>
			{/each}
		</ul>
		<form method="POST" action="?/updateTagSettings">
			<button type="submit" class="btn variant-filled-secondary">태그 검색 설정 업데이트</button>
		</form>

		<div class="text-lg font-bold opacity-75">Users</div>
		<ul class="flex flex-wrap items-center gap-2">
			{#each data.users as user (user.id)}
				<li>
					<form method="POST" action="?/deleteDocument" use:enhance>
						<input type="hidden" name="indexName" value="users" />
						<input type="hidden" name="id" value={user.id} />
						<button type="submit" class="badge variant-filled">{user.nickname}</button>
					</form>
				</li>
			{/each}
		</ul>
		<form method="POST" action="?/updateUserSettings">
			<button type="submit" class="btn variant-filled-secondary">사용자 검색 설정 업데이트</button>
		</form>
	</section>
</div>
