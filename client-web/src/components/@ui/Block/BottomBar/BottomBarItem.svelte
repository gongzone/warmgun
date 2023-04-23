<script lang="ts">
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import classNames from 'classnames';

	export let btnName: string = '';
	export let appBtnPosition: 'left' | 'middle' | 'right' | 'custom' = 'custom';
	export let btnDefault: string = '';
	export let spanDefault: string = '';

	const btnClasses = '';
	const spanClasses = 'sr-only';
	const appBtnClasses = {
		left: 'inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group',
		middle:
			'inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group',
		right:
			'inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group',
		custom: ''
	};
	$: btnClass = classNames(btnDefault, btnClasses, appBtnClasses[appBtnPosition], $$props.btnClass);
	$: spanClass = classNames(spanDefault, spanClasses, $$props.spanClass);
</script>

<button
	class={btnClass}
	aria-label={btnName}
	{...$$restProps}
	on:click
	on:change
	on:keydown
	on:keyup
	on:focus
	on:blur
	on:mouseenter
	on:mouseleave
>
	<slot />
	<span class={spanClass}>{btnName}</span>
</button>
