<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	export let width: string = 'w-12';
	export let src: string | undefined | null;
	export let rounded: string = 'rounded-full';
	export let border: string = '';
	export let cursor: string = 'cursor-pointer';
	export let background: string = 'bg-surface-400-500-token';
</script>

<Avatar
	src={src ?? '/images/user-avatar.svg'}
	{width}
	{rounded}
	{border}
	{cursor}
	{background}
	on:click
	on:keydown
	on:keyup
	on:keypress
/>
