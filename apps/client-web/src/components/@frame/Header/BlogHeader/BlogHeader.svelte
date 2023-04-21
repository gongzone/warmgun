<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import PistolGunIcon from '~icons/game-icons/pistol-gun';

	import AvatarMenu from '../@AvatarMenu/AvatarMenu.svelte';
</script>

<AppBar
	background="bg-transparent"
	border="border-b border-surface-500"
	padding="px-4 py-2 md:px-8"
>
	<svelte:fragment slot="lead">
		<a href="/">
			<PistolGunIcon class="w-[42px] h-[42px] md:w-[52px] md:h-[52px]" />
		</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<AvatarMenu />
	</svelte:fragment>
</AppBar>
