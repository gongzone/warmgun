<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	import TextWithIcon from './TextWithIcon.svelte';

	export let icon: typeof SvelteComponent;
	export let title: string;
	export let subTitle: string;
</script>

<div>
	<h3 class="font-heading-token text-4xl sm:text-5xl">{title}</h3>
	<TextWithIcon {icon} textClass="opacity-75">{subTitle}</TextWithIcon>
</div>
