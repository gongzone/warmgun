<script lang="ts">
	import { findOneTag } from '$api/tag';
	import { page } from '$app/stores';
	import { createQuery } from '@tanstack/svelte-query';

	const tagQuery = createQuery({
		queryKey: ['tags', $page.params['tagname']],
		queryFn: () => findOneTag($page.params['tagname'])
	});
</script>

<div class="md:max-w-[720px] mx-auto px-[5vw] my-8 md:px-0 md:my-20">
	<h3 class="mb-6">태그 페이지(수정이 많이 필요함 - 쿼리 / 태그에 해당하는 아티클 뽑아오기)</h3>
	{#if $tagQuery.isSuccess}
		{$tagQuery.data.name}
	{/if}
</div>
