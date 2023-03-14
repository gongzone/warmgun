<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import AnonymousUserIcon from '~icons/ri/user-line';

	const popupKey = 'anonymous-menu';
	const settings: PopupSettings = {
		event: 'click',
		target: popupKey,
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	const navData = [
		{ to: '/auth/login', name: '로그인' },
		{ to: '/auth/signup', name: '회원가입' }
	];
</script>

<div>
	<button
		type="button"
		use:popup={settings}
		class="btn-icon variant-ringed-tertiary ring-[1.5px] md:btn-icon-lg"
	>
		<span>
			<AnonymousUserIcon />
		</span>
	</button>

	<div class="relative card w-48 p-4 shadow-xl z-50" data-popup={popupKey}>
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
