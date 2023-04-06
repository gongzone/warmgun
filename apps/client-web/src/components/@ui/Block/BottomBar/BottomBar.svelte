<script lang="ts">
	import classNames from 'classnames';
	export let position: 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky' = 'fixed';

	export let outerDefault: string = 'z-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600';
	export let innerDefault: string = 'grid h-full max-w-lg mx-auto';

	const outerDivClasses =
		'h-12 max-w-lg -translate-x-1/2 bg-white border rounded-full bottom-4 left-1/2';
	const innerDivClasses = '';
	$: outerClass = classNames(position, outerDefault, outerDivClasses, $$props.outerDiv);
	$: innerClass = classNames(innerDefault, innerDivClasses, $$props.innerDiv);
</script>

<div class={outerClass} {...$$restProps}>
	<slot name="header" />
	<div class={innerClass}>
		<slot />
	</div>
</div>
