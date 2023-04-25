<script lang="ts">
	import GunShotIcon from '~icons/game-icons/gunshot';
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
	<div class="card mx-auto shadow-xl overflow-hidden max-w-[400px] text-token">
		<header>
			<img src="/skeleton.jfif" class="bg-black/50 w-full aspect-[21/9]" alt="hero-card" />
		</header>
		<div class="p-4 space-y-2">
			<h6 class="text-primary-500">개발 커뮤니티 & 블로그 서비스</h6>
			<div class="flex items-center gap-1">
				<GunShotIcon class="w-6 h-6" />
				<h3 class="unstyled font-logo text-3xl">Warmgun</h3>
			</div>
			<blockquote>
				<p class="opacity-75">터무니없는 것들도</p>
				<p class="opacity-75">언젠가는 빛을 발하겠지...</p>
			</blockquote>
		</div>

		<hr class="opacity-50" />

		<footer class="p-4 flex justify-center items-center space-x-4">
			<div class="flex justify-center space-x-2">
				<span class="chip variant-filled-surface hover:variant-filled">뭐하는 곳인가요?</span>
			</div>
		</footer>
	</div>

	<div class="text-center">
		<h2 class="!text-4xl">당신의 개발 이야기</h2>
		<h3>기록하고 공유하세요</h3>
	</div>
</div>
