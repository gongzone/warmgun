<script lang="ts">
	import type { LayoutServerData } from './$types';

	import Seo from '$components/@utils/Seo.svelte';
	import SearchInput from './_SearchInput/SearchInput.svelte';
	import SearchWords from './_SearchWords/SearchWords.svelte';
	import SearchTab from './_SearchTab/SearchTab.svelte';

	export let data: LayoutServerData;

	$: ({ q } = data);
</script>

<Seo title="검색" />

<div class="max-w-[700px] mx-auto py-16 md:py-20 space-y-8">
	<div class="max-w-[720px] mx-auto space-y-8">
		<SearchInput {q} />
		<SearchWords {q} />
	</div>

	<div class="min-h-[180px]">
		<SearchTab {q} />
		<slot />
	</div>
</div>
