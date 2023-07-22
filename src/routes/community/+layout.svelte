<script lang="ts">
	import CommunityTab from '$components/Community/CommunityTab.svelte';
</script>

<div class="container max-w-[700px] mx-auto py-16 md:py-20">
	<div class="space-y-6 mb-8">
		<h3 class="text-4xl font-bold">커뮤니티</h3>
		<CommunityTab />
	</div>
	<slot />
</div>
