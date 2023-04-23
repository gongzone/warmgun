<script lang="ts">
	import { formatTagNameToSlug } from '$lib/utils/format';

	export let name: string;
</script>

<a href={formatTagNameToSlug(name)} class="unstyled">
	<span class="block max-w-[108px] chip variant-ghost-surface truncate">{name}</span>
</a>
