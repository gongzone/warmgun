<script>
  import MainLogo from '$svg/main-logo.svelte'

  export let title = 'DevWarriors'
  export let description = ''
</script>

<a href="/">
	<div class="flex items-center gap-1">
		<MainLogo />
    <div>
			<h2 class="font-logo text-3xl md:text-4xl">{title}</h2>
      {#if description}
        <span class="hidden md:block">{description}</span>
      {/if}
    </div>
	</div>
</a>