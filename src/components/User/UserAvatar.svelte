<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	import avatarDefault from '$lib/images/avatar-default.svg';

	export let src: string | undefined | null;
	export let width: string = '';
</script>

<Avatar src={src ?? avatarDefault} {width} />
