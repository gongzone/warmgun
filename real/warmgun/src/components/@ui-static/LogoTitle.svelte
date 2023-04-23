<script lang="ts">
	export let hidden: 'none' | 'md' = 'none';

	const hiddenClasses = {
		none: '',
		md: 'hidden md:block'
	};
</script>

<h2 class="unstyled font-['Concert_One'] text-3xl {hiddenClasses[hidden]}">Warmgun</h2>
