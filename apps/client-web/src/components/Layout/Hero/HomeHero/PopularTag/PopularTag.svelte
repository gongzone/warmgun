<script lang="ts">
	export let to: string;
	export let name: string;
</script>

<a href={to} class="btn btn-lg variant-ringed-tertiary w-full rounded-lg text-sm">
	<span class="max-w-[78px] truncate">#{name}</span>
</a>
