<script lang="ts">
	import { openNavigation } from '$components/Drawer/drawer';
</script>

<button
	class="btn-icon variant-ringed-tertiary ring-[1.5px] md:btn-icon-lg"
	on:click={openNavigation}
>
	<i class="ri-menu-2-line ri-lg" />
</button>
