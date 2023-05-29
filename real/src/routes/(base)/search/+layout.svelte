<script lang="ts">
	import type { LayoutData } from './$types';

	import SearchInput from './_SearchInput/SearchInput.svelte';
	import SearchTab from './_SearchTab/SearchTab.svelte';

	export let data: LayoutData;

	$: ({ q } = data);
</script>

<div class="container py-12 md:py-20">
	<div class="space-y-12 mb-8">
		<div class="max-w-[720px] mx-auto">
			<SearchInput {q} />
		</div>
		<SearchTab {q} />
	</div>

	<slot />
</div>
