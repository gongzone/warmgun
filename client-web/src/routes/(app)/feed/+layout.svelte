<script lang="ts">
</script>

<div class="md:max-w-[720px] mx-auto px-[5vw] my-8 md:px-0 md:my-20">
	<div class="flex justify-between">
		<a href="/feed">마이 피드</a>
		<a href="/feed/like">좋아요한 아티클</a>
		<a href="/feed/following">구독중인 블로거</a>
	</div>

	<div class="my-8 sm:my-12 md:px-0 lg:my-12">
		<div class="py-6">
			<slot />
		</div>
	</div>
</div>
