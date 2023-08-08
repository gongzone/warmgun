<script lang="ts">
	import { cn } from '$lib/utils/cn';

	export let width: 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let style: 'solid' | 'dash' | 'dot' | 'double' = 'solid';

	const widths = {
		sm: '!border-t',
		md: '!border-t-2',
		lg: '!border-t-4',
		xl: '!border-t-8'
	};

	const styles = {
		solid: '!border-solid',
		dash: '!border-dashed',
		dot: '!border-dotted',
		double: '!border-double'
	};

	$: baseClasses = cn(widths[width], styles[style], $$props.class);
</script>

<hr class={baseClasses} />
