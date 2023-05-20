<script lang="ts">
	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	import { siteConfig } from '$lib/configs/site';

	export let genre: string = 'ETC';

	const popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<button class="btn variant-filled w-48 justify-between" use:popup={popupCombobox}>
	<span class="capitalize">{siteConfig.genre.find((g) => g.enum === genre)?.title}</span>
	<span>↓</span>
</button>

<div class="card w-48 shadow-xl py-2" data-popup="popupCombobox">
	<ListBox rounded="rounded-none">
		{#each siteConfig.genre as g (g.enum)}
			<ListBoxItem bind:group={genre} name={g.enum} value={g.enum}>{g.title}</ListBoxItem>
		{/each}
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
