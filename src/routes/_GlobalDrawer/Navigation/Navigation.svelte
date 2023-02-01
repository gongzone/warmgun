<script lang="ts">
	import NavigationHeader from './NavigationHeader/NavigationHeader.svelte';
	import NavigationList from './NavigationList/NavigationList.svelte';
</script>

<div>
	<NavigationHeader />

	<div class="px-4 py-6">
		<div class="space-y-4">
			<NavigationList />
		</div>
	</div>
</div>
