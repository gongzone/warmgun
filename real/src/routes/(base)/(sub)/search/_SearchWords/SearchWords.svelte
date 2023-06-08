<script lang="ts">
	export let q: string = '';
</script>

<div class="text-center">
	<h2 class="font-heading-token text-3xl">
		{#if !!q}
			"{q}"에 대한 검색결과
		{:else}
			멋진 아티클을 찾아보세요!
		{/if}
	</h2>
</div>
