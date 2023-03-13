<script>
	export let width = 'w-full';
	export let height = '';
</script>

<div class={`input-group input-group-divider grid-cols-[1fr_auto_auto] ${width} ${height}`}>
	<input type="search" placeholder="검색어를 입력하세요" class="input" />
	<a href="/" class="unstyled">
		<i class="ri-search-line px-2 md:px-3" />
	</a>
</div>
