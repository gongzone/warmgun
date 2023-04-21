<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import UserIcon from '~icons/ri/user-line';

	import { anonymousLinks } from '$lib/constants/nav';
	import NavLink from '$components/@ui/Link/NavLink/NavLink.svelte';

	const menuKey = 'anonymous-menu';
	const settings: PopupSettings = {
		event: 'click',
		target: menuKey,
		placement: 'bottom',
		closeQuery: '.list-nav li'
	};
</script>

<div>
	<button
		type="button"
		use:popup={settings}
		class="btn-icon variant-ringed-tertiary ring-[1.5px] md:btn-icon-lg"
	>
		<span><UserIcon /></span>
	</button>

	<div class="relative card w-52 p-4 shadow-xl z-50" data-popup={menuKey}>
		<nav class="list-nav">
			<ul>
				{#each anonymousLinks as link (link.to)}
					<li>
						<NavLink {link} textClasses="py-1" />
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</div>
