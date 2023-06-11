<script lang="ts">
	import Seo from '$components/@utils/Seo.svelte';
	import FeedTab from './_FeedTab/FeedTab.svelte';
</script>

<Seo title="피드" />

<main class="page-container">
	<div class="mb-8">
		<FeedTab />
	</div>

	<slot />
</main>
