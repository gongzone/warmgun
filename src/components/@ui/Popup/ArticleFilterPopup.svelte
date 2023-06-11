<script lang="ts">
	import { popup, ListBox, ListBoxItem, type PopupSettings } from '@skeletonlabs/skeleton';
	import { articleFilters } from '$lib/configs/filter';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	$: comboboxValue = articleFilters.find((f) => f.enum === $page.params.filter)?.title;

	const popupKey = 'article-filter';
	const popupSettings: PopupSettings = {
		event: 'click',
		target: popupKey,
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<button class="btn variant-filled w-48 justify-between" use:popup={popupSettings}>
	<span class="capitalize">{comboboxValue ?? articleFilters[0].title}</span>
	<span>↓</span>
</button>

<div class="card w-48 shadow-xl py-2 z-40" data-popup={popupKey}>
	<ListBox rounded="rounded-none">
		{#each articleFilters as filter (filter.title)}
			<ListBoxItem
				bind:group={comboboxValue}
				name={filter.enum}
				value={filter.title}
				on:click={() =>
					goto(`/articles/${filter.enum}${$page.params.genre ? `/${$page.params.genre}` : ''}`, {
						noScroll: true
					})}>{filter.title}</ListBoxItem
			>
		{/each}
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
