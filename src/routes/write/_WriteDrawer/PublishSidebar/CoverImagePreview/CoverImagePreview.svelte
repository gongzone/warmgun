<script lang="ts">
	export let url: string;
</script>

<div>
	{#if !url}
		<p>이미지 없음</p>
	{:else}
		<img src={url} alt="cover" />
	{/if}
</div>
