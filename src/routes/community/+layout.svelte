<script lang="ts">
	import CommunityTab from '$components/Community/CommunityTab.svelte';
</script>

<div class="container max-w-[800px] mx-auto py-16 md:py-20">
	<div class="space-y-6">
		<div class="flex justify-center">
			<h3 class="text-7xl font-bold">Community</h3>
		</div>
		<CommunityTab />
	</div>
	<slot />
</div>
