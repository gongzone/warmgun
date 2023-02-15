<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	export let width: string = '';
	export let src: string | undefined | null;
</script>

<Avatar {width} src={src ?? '/avatars/monkey.svg'} />
