<script lang="ts">
	export let promiseCover: Promise<string> | null;
</script>

<div>
	{#if !promiseCover}
		기본 이미지
	{:else}
		{#await promiseCover}
			<p>...waiting</p>
		{:then coverImageUrl}
			<img src={coverImageUrl} alt="cover" />
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	{/if}
</div>
