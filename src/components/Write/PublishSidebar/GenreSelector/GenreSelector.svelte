<script lang="ts">
	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	import { categories, type Category } from '$lib/constants/categories';

	export let category: Category = 'ETC';

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'category-selector',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<button class="btn variant-filled w-48 justify-between" use:popup={popupCombobox}>
	<span class="capitalize">{categories[category].title}</span>
	<span>↓</span>
</button>

<div class="card w-48 shadow-xl py-2" data-popup="category-selector">
	<ListBox rounded="rounded-none">
		{#each Object.entries(categories) as [categoryEnum, { title, slug }] (categoryEnum)}
			<ListBoxItem bind:group={category} name={categoryEnum} value={categoryEnum}
				>{title}</ListBoxItem
			>
		{/each}
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
