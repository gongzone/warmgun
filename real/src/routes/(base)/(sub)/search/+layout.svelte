<script lang="ts">
	import { page } from '$app/stores';

	import SearchInput from './_SearchInput/SearchInput.svelte';
	import SearchTab from './_SearchTab/SearchTab.svelte';

	$: q = $page.url.searchParams.get('q') ?? undefined;
</script>

<div class="container py-12 md:py-20">
	<div class="max-w-[720px] mx-auto">
		<SearchInput {q} />
	</div>

	<div class="my-12">
		<SearchTab {q} />
	</div>

	<slot />
</div>
