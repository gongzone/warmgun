<script lang="ts">
	import { popup, ListBox, ListBoxItem, type PopupSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';

	export let initValue: string | undefined | null;
	export let items: { [key: string]: string };

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	const dispatch = createEventDispatcher();

	function onClickItem(e: any) {
		dispatch('sort', e.target.name);
	}
	$: console.log(initValue);
</script>

<div class="">
	<button class="btn variant-filled rounded-md justify-between" use:popup={popupCombobox}>
		<span class="capitalize">{initValue}</span>
		<span>↓</span>
	</button>

	<div class="card w-28 shadow-xl rounded-md py-2 z-30" data-popup="popupCombobox">
		<ListBox rounded="rounded-none">
			{#each Object.entries(items) as [key, value], i (i)}
				<ListBoxItem bind:group={initValue} name={key} {value} on:click={onClickItem}
					>{value}</ListBoxItem
				>
			{/each}
		</ListBox>
		<div class="arrow bg-surface-100-800-token" />
	</div>
</div>
