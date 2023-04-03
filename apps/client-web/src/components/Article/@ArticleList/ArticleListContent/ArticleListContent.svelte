<script lang="ts">
	export let title: string;
	export let subTitle: string;
	export let slug: string;
</script>

<div class="flex flex-col gap-3">
	<a class="unstyled" href={slug}>
		<h3 class="!text-lg sm:!text-2xl !font-bold line-clamp-2">{title}</h3>
	</a>

	<p class="unstyled text-surface-300 font-thin line-clamp-2">
		{subTitle}
	</p>
</div>
