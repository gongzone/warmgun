<script lang="ts">
	import { page } from '$app/stores';
	import {
		TabGroup,
		Tab,
		TabAnchor,
		popup,
		ListBox,
		ListBoxItem,
		type PopupSettings
	} from '@skeletonlabs/skeleton';

	import { navs } from '$lib/constants/navs';

	let comboboxValue: string;

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<div class="space-y-2">
	<div class="flex justify-between">
		<div class="">
			<button class="btn variant-filled rounded-md justify-between" use:popup={popupCombobox}>
				<span class="capitalize">{comboboxValue ?? '최신순'}</span>
				<span>↓</span>
			</button>

			<div class="card w-28 shadow-xl rounded-md py-2" data-popup="popupCombobox">
				<ListBox rounded="rounded-none">
					<ListBoxItem bind:group={comboboxValue} name="medium" value="recent">최신순</ListBoxItem>
					<ListBoxItem bind:group={comboboxValue} name="medium" value="trending">인기순</ListBoxItem
					>
				</ListBox>
				<div class="arrow bg-surface-100-800-token" />
			</div>
		</div>

		<button class="btn variant-ringed-tertiary">게시글 작성</button>
	</div>

	<TabGroup justify="justify-center">
		{#each navs.community as commnunity (commnunity.title)}
			<TabAnchor href={commnunity.href} selected={$page.url.pathname === commnunity.href}>
				<span>{commnunity.title}</span>
			</TabAnchor>
		{/each}
	</TabGroup>
</div>
