<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	const menuKey = 'anonymous-menu';
	const anonymousMenuSettings: PopupSettings = {
		event: 'click',
		target: menuKey
	};
</script>

<div>
	<button
		type="button"
		use:popup={anonymousMenuSettings}
		class="btn-icon variant-ringed-tertiary ring-[1.5px] md:btn-icon-lg"
	>
		<i class="ri-user-line ri-lg" />
	</button>

	<div class="relative card w-52 md:w-60 p-4 shadow-xl z-50" data-popup={menuKey}>
		<nav class="list-nav">
			<ul>
				<li>
					<a href="/auth/login">
						<span class="py-1">로그인</span>
					</a>
				</li>
				<li>
					<a href="/auth/signup">
						<span class="py-1">회원가입</span>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</div>
