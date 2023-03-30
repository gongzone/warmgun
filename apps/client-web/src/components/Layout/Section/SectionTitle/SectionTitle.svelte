<script lang="ts">
	export let title: string = '';
	export let subTitle: string = '';
</script>

<div class="flex flex-col items-center justify-center gap-3">
	<div class="relative">
		<span class="absolute w-[50px] top-[50%] border-b-2 -translate-x-[125%]" />
		<span class="text-4xl font-bold">{title}</span>
		<span class="absolute w-[50px] top-[50%] border-b-2 right-0 translate-x-[125%]" />
	</div>
	<span class="text-sm text-surface-300">{subTitle}</span>
</div>
