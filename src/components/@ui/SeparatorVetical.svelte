<script lang="ts">
	import { cn } from '$lib/utils/cn';

	$: baseClasses = cn('divider-vertical', $$props.class);
</script>

<span class={baseClasses} />
