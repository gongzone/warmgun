<script lang="ts">
	import programmingImage from '$lib/images/programming.svg';
	import { genre } from '$lib/configs/genre';

	import ContrastIcon from '$components/@icons/ContrastIcon.svelte';
	import GenreIcon from '$components/@icons/GenreIcon.svelte';
	import ArrowRightIcon from '$components/@icons/ArrowRightIcon.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import TextSection from '$components/@ui/TextSection.svelte';
</script>

<div>
	<TextSection
		title="더 많은 글들이 당신을 기다립니다"
		subTitle="지식과 영감을 얻고 유용하게 활용하세요"
		icon={ContrastIcon}
	/>

	<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
		<img src={programmingImage} class="max-w-[480px] lg:max-w-full mx-auto" alt="programming" />
		<div class="space-y-8">
			<div>
				<TextWithIcon icon={GenreIcon} size="3xl" class="!items-end" textClass="font-heading-token">
					Genre
				</TextWithIcon>
				<hr class="mt-3 mb-6 !border-surface-300" />
				<ul class="flex flex-wrap gap-3">
					{#each genre as genre (genre.title)}
						<li>
							<a href={genre.href} class="btn variant-filled text-sm">{genre.title}</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="flex flex-wrap gap-3">
				<a href="/articles" class="btn variant-filled-primary rounded-md">
					<span class="text-sm">아티클 보러가기</span>
					<span><ArrowRightIcon class="w-4 h-4" /></span>
				</a>
			</div>
		</div>
	</div>
</div>
