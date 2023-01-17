<script lang="ts">
	import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';

	export let icon: string | undefined;
	export let title: string | undefined;
	export let action: (() => boolean) | undefined;
	export let isActive: (() => boolean) | undefined;
</script>

<button
	class={`bg-transparent border-none rounded-md text-gray-300 w-8 h-8 p-1 mr-1 hover:bg-black hover:text-yellow-300 ${
		isActive && isActive() ? ' is-active bg-black text-yellow-300' : ''
	}`}
	on:click={action}
	{title}
>
	<svg class="remix fill-current w-full h-full">
		<use xlink:href={`${remixiconUrl}#ri-${icon}`} />
	</svg>
</button>
