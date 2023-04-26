<script lang="ts">
	import ArrowIcon from '~icons/ri/contract-right-fill';
</script>

<div
	class="relative max-w-[640px] mx-auto transition ease-in-out duration-200 bg-white text-surface-900 shadow-xl"
>
	<span
		class="badge variant-filled-primary absolute -top-4 -right-12 z-10 text-lg px-6 py-6 rotate-[30deg] font-extralight"
		>Top Bloger</span
	>
	<header class="bg-neutral-100 p-4 grid grid-cols-3 gap-8 items-center">
		<img
			src="https://source.unsplash.com/C5NOq1BKlAk/200x200"
			class="bg-black bg-black/50 w-full aspect-square scale-110 transition-transform"
			alt="Cover"
		/>
		<div class="col-span-2 space-y-2">
			<div class="text-lg opacity-50">Frontend</div>
			<div class="text-xl sm:text-2xl font-sans font-light">멋쟁이 개발자</div>
			<div class="text-lg sm:text-lg font-sans font-light">뭐 저는 이런저런 사람입니다.</div>
		</div>
	</header>

	<footer class="flex justify-between items-center p-10">
		<div class="grid grid-cols-3">
			<button class="flex flex-col" title="구독자 수">
				<span class="font-semibold text-sm">구독자</span>
				<span class="font-light text-sm">965</span>
			</button>
			<button class="flex flex-col" title="구독자 수">
				<span class="font-semibold text-sm">작성한 아티클</span>
				<span class="font-light text-sm">75</span>
			</button>
		</div>

		<div>
			<button
				class="btn-icon bg-surface-900 shadow-lg text-surface-50 hover:bg-surface-50 hover:text-surface-900 hover:border hover:border-surface-300"
			>
				<ArrowIcon />
			</button>
		</div>
	</footer>
</div>
