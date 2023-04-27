<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	export let src: string | null = null;
	export let width: string | undefined = 'w-12';
</script>

<Avatar src={src ?? '/user-default.svg'} {width} />
