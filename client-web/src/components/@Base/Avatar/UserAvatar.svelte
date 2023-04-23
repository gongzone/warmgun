<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import avatarDefault from '$lib/images/avatar-default.svg';

	export let avatar: string | null = null;
	export let width: string | undefined = 'w-12';
</script>

<Avatar src={avatar ?? avatarDefault} {width} />
