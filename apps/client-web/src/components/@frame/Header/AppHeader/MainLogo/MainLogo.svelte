<script lang="ts">
	import PistolGunIcon from '~icons/game-icons/pistol-gun';

	export let name: string = '';
	export let description: string = '';
</script>

<a href="/" class="unstyled inline-block">
	<div class="flex items-center gap-2">
		<PistolGunIcon class="w-[42px] h-[42px] md:w-[58px] md:h-[58px]" />

		<div class="hidden sm:block">
			<h2 class="unstyled font-logo text-2xl md:text-4xl">{name}</h2>
			<span>{description}</span>
		</div>
	</div>
</a>
