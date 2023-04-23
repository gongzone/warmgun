<script lang="ts">
	export let title: string;
	export let subTitle: string;
	export let slug: string;
</script>

<div class="flex flex-col gap-3 md:pl-14">
	<a class="unstyled" href={slug}>
		<h3 class="unstyled text-lg font-bold line-clamp-2 sm:text-2xl">{title}</h3>
	</a>
	<a class="unstyled" href={slug}>
		<p class="unstyled text-surface-300 font-thin line-clamp-2">{subTitle}</p>
	</a>
</div>
