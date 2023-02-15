<script lang="ts">
	import { openNavSidebar } from '$components/Drawer/GlobalDrawer/drawer';
</script>

<button
	class="btn-icon variant-ringed-tertiary ring-[1.5px] md:btn-icon-lg"
	on:click={openNavSidebar}
>
	<i class="ri-menu-2-line ri-lg" />
</button>
