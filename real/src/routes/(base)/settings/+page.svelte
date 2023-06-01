<script lang="ts">
	import type { ActionData } from './$types';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { FileButton } from '@skeletonlabs/skeleton';

	import { uploadImage } from '$lib/client-fetch/upload-image';
	import { siteConfig } from '$lib/configs/site';

	import UserIcon from '$components/@icons/UserIcon.svelte';
	import IdentityIcon from '$components/@icons/IdentityIcon.svelte';
	import UploadIcon from '$components/@icons/UploadIcon.svelte';
	import DeleteIcon from '$components/@icons/DeleteIcon.svelte';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import FormInput from '$components/@ui/FormInput.svelte';
	import FormTextarea from '$components/@ui/FormTextarea.svelte';
	import { triggerToast } from '$components/@ui/Toast/toast';

	export let form: ActionData;

	let files: FileList;
	let isLoading: boolean = false;

	$: avatar = $page.data.user?.profile?.avatar;

	$: if (form?.message) {
		triggerToast(`${form.isSuccess ? 'success' : 'warning'}`, form.message);
	}
</script>

{#if $page.data.user}
	<div class="relative inline-block mb-4">
		<UserAvatar src={avatar} width="w-24" />
		{#if avatar}
			<div class="absolute -top-0 -right-2 z-10">
				<button
					type="button"
					class="btn-icon variant-filled btn-icon-sm"
					on:click={() => {
						avatar = null;
					}}
				>
					<DeleteIcon class="w-4 h-4" />
				</button>
			</div>
		{/if}
		<div class="absolute -bottom-0 -right-2 z-10">
			<FileButton
				name="avatar"
				accept="image/*"
				button="btn-icon variant-filled btn-icon-sm"
				bind:files
				on:change={async () => {
					if (!files) return;
					isLoading = true;
					avatar = await uploadImage(files[0]);
					isLoading = false;
				}}
			>
				<UploadIcon class="w-4 h-4" />
			</FileButton>
		</div>
	</div>

	<form
		method="POST"
		use:enhance={({ data }) => {
			avatar && data.append('avatar', avatar);

			return async ({ update, result }) => {
				update({ reset: false });
			};
		}}
	>
		<div class="space-y-5 mb-8">
			<FormInput
				type="text"
				name="nickname"
				labelText="닉네임"
				icon={UserIcon}
				placeholder="닉네임을 입력해주세요."
				value={$page.data.user.profile?.nickname}
			/>
			<FormInput
				type="text"
				name="field"
				labelText="정체성 (직업, 활동 분야)"
				helperText="* 당신을 대표하는 한 단어를 적어주세요."
				placeholder="정체성을 입력해주세요."
				icon={IdentityIcon}
				value={$page.data.user.profile?.field}
			/>
			<FormTextarea
				rows={6}
				name="bio"
				labelText="소개말"
				placeholder="소개말을 입력해주세요."
				value={$page.data.user.profile?.bio}
			/>

			<div>
				<span class="text-lg font-bold">소셜 링크</span>
				<hr class="my-2" />
				<div class="space-y-5">
					{#each siteConfig.socials as social (social.title)}
						<FormInput
							type="text"
							name={social.enum}
							labelText={social.title}
							icon={social.icon}
							placeholder={`${social.title} - 주소를 입력하세요`}
							required={false}
							value={$page.data.user.profile?.profileLinks?.[social.enum] ?? ''}
						/>
					{/each}
				</div>
			</div>
		</div>
		<button type="submit" class="btn variant-filled-primary">수정하기</button>
	</form>
{/if}
