<script lang="ts">
	import AutosizeTextarea from '$components/@ui/AutosizeTextarea.svelte';
	import Editor from '$components/@editor/Editor.svelte';
	import Separator from '$components/@ui/Separator.svelte';

	import { navs } from '$lib/constants/navs';

	let value: string;
</script>

<div class="flex items-center gap-2 mb-8">
	<select class="select w-32 rounded-md">
		{#each navs.community.slice(1) as community (community.title)}
			<option>{community.title}</option>
		{/each}
	</select>

	<input class="input" title="Input (text)" type="text" placeholder="제목을 입력해주세요" />
</div>

<Editor />
