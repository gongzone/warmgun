<script>
  import MainLogo from '$svg/main-logo.svelte'

  export let title = 'DevWarriors'
  export let description = '개발 커뮤니티 & 블로그 서비스'
</script>

<a href="/">
	<div class="flex items-center gap-1">
		<MainLogo />
    <div>
			<h2 class="font-logo text-3xl md:text-4xl">{title}</h2>
      <span class="hidden md:block">{description}</span>
    </div>
	</div>
</a>