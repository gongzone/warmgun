<script lang="ts">
	import GunShotIcon from '~icons/game-icons/gunshot';
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
	<div class="mx-auto shadow-xl overflow-hidden max-w-[400px] text-token">
		<header>
			<img
				src="https://source.unsplash.com/vjUokUWbFOs/400x175"
				class="bg-black/50 w-full aspect-[21/9]"
				alt="hero-card"
			/>
		</header>
		<div class="p-4 space-y-2">
			<h6 class="text-primary-500">For Developers</h6>
			<div class="flex items-center gap-1">
				<GunShotIcon />
				<h3 class="unstyled font-logo text-2xl">Warmgun</h3>
			</div>
			<article>
				<p class="opacity-75 font-thin !text-sm">개발 커뮤니티 & 블로그 서비스</p>
			</article>
		</div>
		<hr class="opacity-50" />
		<footer class="p-4 flex justify-center items-center space-x-4">
			<div class="flex justify-center space-x-2">
				<span class="chip variant-soft hover:variant-filled"
					><i class="fa-solid fa-heart" /> <span>Like</span></span
				>
				<span class="chip variant-soft hover:variant-filled"
					><i class="fa-solid fa-paperclip" /> <span>Save</span></span
				>
				<span class="chip variant-soft hover:variant-filled"
					><i class="fa-solid fa-share" /> <span>Share</span></span
				>
			</div>
		</footer>
	</div>

	<div class="text-center">
		<h2 class="!text-4xl">당신의 개발 이야기</h2>
		<h3>기록하고 공유하세요</h3>
	</div>
</div>
