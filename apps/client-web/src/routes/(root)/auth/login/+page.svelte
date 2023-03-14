<script lang="ts">
	import UserIcon from '~icons/ri/user-line';
	import PasswordIcon from '~icons/ri/lock-password-line';

	import LabelInput from '$components/@base/Input/LabelInput.svelte';
</script>

<form>
	<div class="space-y-5 mb-8">
		<LabelInput type="text" name="username">
			<svelte:fragment slot="labelText">아이디</svelte:fragment>
			<svelte:fragment slot="icon"><UserIcon /></svelte:fragment>
		</LabelInput>

		<LabelInput type="password" name="password">
			<svelte:fragment slot="labelText">비밀번호</svelte:fragment>
			<svelte:fragment slot="icon"><PasswordIcon /></svelte:fragment>
		</LabelInput>
	</div>

	<button type="submit" class="w-full btn variant-filled-primary">로그인</button>
</form>
