<script lang="ts">
	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	import { categories, type Category } from '$lib/constants/categories';

	export let category: Category = 'ETC';

	const popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<button class="btn variant-filled w-48 justify-between" use:popup={popupCombobox}>
	<span class="capitalize">{categories[category].title}</span>
	<span>↓</span>
</button>

<div class="card w-48 shadow-xl py-2" data-popup="popupCombobox">
	<ListBox rounded="rounded-none">
		{#each Object.entries(categories) as [categoryEnum, categoryTitle] (categoryEnum)}
			<ListBoxItem bind:group={category} name={categoryEnum} value={categoryEnum}
				>{categoryTitle}</ListBoxItem
			>
		{/each}
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
