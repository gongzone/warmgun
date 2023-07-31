<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let src: string | undefined | null;
	export let name: string | undefined = undefined;
	export let subText: string | undefined = undefined;
	export let width: string = 'w-12';
	export let rounded: string = 'rounded-full';
	export let border: string = '';
	export let cursor: string = '';
	export let background: string = 'bg-surface-400-500-token';

	export let avatarClasses = '';
	export let nameClasses = '';
	export let subTextClassese = '';
</script>

{#if name}
	<div class="flex items-center gap-1">
		<Avatar
			src={src ?? '/images/user-avatar.svg'}
			class={avatarClasses}
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
		<div class="flex flex-col">
			<span class={cn('font-medium', nameClasses)}>{name}</span>
			{#if subText}
				<span class={cn('text-sm font-extralight', subTextClassese)}>{subText}</span>
			{/if}
		</div>
	</div>
{:else}
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
{/if}
