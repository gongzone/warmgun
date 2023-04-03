<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import UserIcon from '~icons/ri/user-line';

	const menuKey = 'anonymous-menu';
	const settings: PopupSettings = {
		event: 'click',
		target: menuKey,
		placement: 'bottom',
		closeQuery: '.list-nav li'
	};

	const navData = [
		{ name: '로그인', to: '/auth/login' },
		{ name: '회원가입', to: '/auth/signup' }
	];
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
				{#each navData as nav (nav.to)}
					<li>
						<a href={nav.to}>
							<span class="py-1">{nav.name}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</div>
