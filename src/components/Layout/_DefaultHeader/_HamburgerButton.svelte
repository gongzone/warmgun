<script lang="ts">
	import { openNavSidebar } from '$components/@ui/Drawer/drawer';

	import HamburgerIcon from '$components/@icons/HamburgerIcon.svelte';
</script>

<button class="btn-icon md:hidden" on:click={() => openNavSidebar()}>
	<HamburgerIcon class="w-5 h-5" />
</button>
