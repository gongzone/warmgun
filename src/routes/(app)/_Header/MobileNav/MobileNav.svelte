<script lang="ts">
	import { menu } from '@skeletonlabs/skeleton';
</script>

<div class="relative">
	<button
		use:menu={{ menu: 'mobile-nav-menu' }}
		class="btn-icon variant-ringed-tertiary w-12 ring-[1.5px]"
	>
		<i class="ri-menu-2-line ri-lg" />
	</button>

	<nav class="w-64 p-4 shadow-xl list-nav card" data-menu="mobile-nav-menu">
		<ul>
			<li>
				<a href="/article">
					<span class="badge-icon py-4"><i class="ri-draft-line ri-xl" /></span>
					<span class="flex-auto">아티클</span>
				</a>
			</li>
		</ul>
	</nav>
</div>
