<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	export let src: string | null | undefined;
	export let width: string | undefined = 'w-12';
	export let rounded: string | undefined = 'rounded-full';
</script>

<Avatar src={src ?? '/user-default.svg'} {width} {rounded} shadow="shadow-lg" />
