<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	$: console.log(data);
</script>

<div class="space-y-8">
	<ul class="flex flex-col gap-2 p-6 bg-surface-700 rounded-lg">
		{#each data.articles.results as result (result.id)}
			<li class="flex items-center gap-2">
				<span>{result.title}</span>
				<form method="POST" action="?/deleteSearchArticle" use:enhance>
					<input type="hidden" name="id" value={result.id} />
					<button class="btn variant-filled-error btn-sm">삭제</button>
				</form>
			</li>
		{/each}
	</ul>

	<ul class="flex flex-col gap-2 p-6 bg-surface-700 rounded-lg">
		{#each data.tags.results as result (result.id)}
			<li class="flex items-center gap-2">
				<span>{result.name}</span>
				<form method="POST" action="?/deleteSearchTag" use:enhance>
					<input type="hidden" name="id" value={result.id} />
					<button class="btn variant-filled-error btn-sm">삭제</button>
				</form>
			</li>
		{/each}
	</ul>

	<ul class="flex flex-col gap-2 p-6 bg-surface-700 rounded-lg">
		{#each data.users.results as result (result.id)}
			<li class="flex items-center gap-2">
				<span>{result.nickname}</span>
				<form method="POST" action="?/deleteSearchUser" use:enhance>
					<input type="hidden" name="id" value={result.id} />
					<button class="btn variant-filled-error btn-sm">삭제</button>
				</form>
			</li>
		{/each}
	</ul>
</div>
