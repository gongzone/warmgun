<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;
	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import ImagePreview from './ImagePreview.svelte';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import { updateMyProfile } from '$api/user';
	// Form Data
	const formData = {
		nickname: '',
		bio: '',
		avatar: null
	};

	const queryClient = useQueryClient();

	const updateMyProfileMutation = createMutation({
		mutationFn: () => updateMyProfile(formData),
		onSuccess: () => {
			queryClient.invalidateQueries(['me']);
		}
	});

	// We've created a custom submit function to pass the response and close the modal.
	async function onFormSubmit() {
		await $updateMyProfileMutation.mutateAsync();
		modalStore.close();
	}
	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

	onMount(() => {
		formData.nickname = $modalStore[0].meta?.nickname;
		formData.bio = $modalStore[0].meta?.bio;
		formData.avatar = $modalStore[0].meta?.avatar;
	});
</script>

<!-- @component This example creates a simple form modal. -->

<div class="modal-example-form {cBase}">
	<header class={cHeader}>{$modalStore[0]?.title ?? '(title missing)'}</header>
	<article>{$modalStore[0]?.body ?? '(body missing)'}</article>
	<!-- Enable for debugging: -->
	<!-- <pre>{JSON.stringify(formData, null, 2)}</pre> -->
	<form class="modal-form {cForm}">
		<ImagePreview bind:coverImage={formData.avatar} />
		<label class="label">
			<span>닉네임</span>
			<input class="input" type="text" bind:value={formData.nickname} placeholder="Enter name..." />
		</label>
		<label class="label">
			<span>소개말</span>
			<input class="input" type="text" bind:value={formData.bio} placeholder="Enter phone..." />
		</label>
	</form>
	<!-- prettier-ignore -->
	<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>수정완료</button>
    </footer>
</div>
