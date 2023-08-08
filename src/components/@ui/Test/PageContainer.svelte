<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let className: string | undefined = undefined;

	export { className as class };
</script>

<div class={cn('container py-12 md:py-20', className)}>
	<slot />
</div>
