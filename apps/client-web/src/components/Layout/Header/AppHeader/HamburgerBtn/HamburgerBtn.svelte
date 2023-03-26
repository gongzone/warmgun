<script lang="ts">
	import HamburgerIcon from '~icons/ri/menu-2-line';

	import { openNavSidebar } from '$components/Layout/Drawer/drawer';
</script>

<button
	class="btn-icon variant-ringed-tertiary ring-[1.5px] md:btn-icon-lg"
	on:click={openNavSidebar}
>
	<span>
		<HamburgerIcon />
	</span>
</button>
