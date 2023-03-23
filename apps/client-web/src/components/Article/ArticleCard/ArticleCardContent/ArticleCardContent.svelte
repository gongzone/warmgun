<script lang="ts">
	import { formatDate } from '$lib/utils/format';

	export let title: string;
	export let subTitle: string;
	export let date: Date;
</script>

<div class="p-4">
	<span class="text-sm font-thin mb-2">On {formatDate(date)}</span>
	<div class="space-y-3">
		<h3 class="unstyled text-xl font-bold line-clamp-1">{title}</h3>
		<p class="line-clamp-3 sm:line-clamp-2 font-thin">{subTitle}</p>
	</div>
</div>
