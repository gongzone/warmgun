<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	import avatarDefault from '$lib/images/avatar-default.svg';

	export let width: string = '';
	export let src: string | undefined | null;
</script>

<Avatar {width} src={src ?? avatarDefault} />
