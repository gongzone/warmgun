<script lang="ts">
	import SearchIcon from '~icons/ri/search-line';

	let value: string;
</script>

<div class="input-group input-group-divider h-14 grid-cols-[1fr_auto_auto]">
	<input bind:value type="search" placeholder="검색어를 입력하세요" class="input" />
	<a href={`/search/${value}`} class="unstyled">
		<span class="px-2 md:px-3">
			<SearchIcon />
		</span>
	</a>
</div>
