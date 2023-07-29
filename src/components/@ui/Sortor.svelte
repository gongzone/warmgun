<script context="module" lang="ts">
	export interface SortorItem {
		value: string;
		title: string;
	}
</script>

<script lang="ts">
	import { popup, ListBox, ListBoxItem, type PopupSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';

	export let items: SortorItem[];

	let comboboxValue: string;

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	const dispatch = createEventDispatcher();

	function onClickItem(e: any) {
		const target = items.find((item) => item.title === e.target.value)?.value;
		dispatch('sort', target);
	}
</script>

<div class="">
	<button class="btn variant-filled rounded-md justify-between" use:popup={popupCombobox}>
		<span class="capitalize">{comboboxValue ?? items[0].title}</span>
		<span>↓</span>
	</button>

	<div class="card w-28 shadow-xl rounded-md py-2 z-30" data-popup="popupCombobox">
		<ListBox rounded="rounded-none">
			{#each items as item, i (i)}
				<ListBoxItem
					bind:group={comboboxValue}
					name={item.value}
					value={item.title}
					on:click={onClickItem}>{item.title}</ListBoxItem
				>
			{/each}
		</ListBox>
		<div class="arrow bg-surface-100-800-token" />
	</div>
</div>
