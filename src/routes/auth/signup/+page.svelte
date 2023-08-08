<script lang="ts">
	import type { SubmitFunction } from './$types';
	import { enhance } from '$app/forms';

	import { triggerToast } from '$components/@ui/Toast/toast';
	import CloseIcon from '$components/@icons/CloseIcon.svelte';
	import UserIcon from '$components/@icons/UserIcon.svelte';
	import PasswordIcon from '$components/@icons/PasswordIcon.svelte';
	import CheckIcon from '$components/@icons/CheckIcon.svelte';
	import EmailIcon from '$components/@icons/EmailIcon.svelte';
	import FormInput from '$components/@ui/FormInput.svelte';

	let visible: boolean = true;

	const signupHandler: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'failure' && result.data) {
				return triggerToast('warning', result.data.message);
			}

			await update();
		};
	};
</script>

{#if visible}
	<aside class="alert variant-filled-error">
		<div class="text-3xl">⚠️</div>

		<div class="alert-message">
			<h3 class="h3">현재 Warmgun은 공식 배포 버전이 아닙니다.</h3>
			<ul class="flex flex-col gap-1">
				<li>
					- 공식 배포 전 생성된 사용자 계정과 작성된 글들은 언제라도 삭제가 이뤄질 수 있습니다.
				</li>
				<li>- 자유롭게 해당 사이트의 기능들을 이용해보세요.</li>
			</ul>
		</div>

		<div class="alert-actions">
			<button
				type="button"
				class="btn-icon btn-icon-sm variant-filled"
				on:click={() => {
					visible = false;
				}}
			>
				<CloseIcon />
			</button>
		</div>
	</aside>
{/if}

<form method="POST" use:enhance={signupHandler}>
	<div class="space-y-5 mb-8">
		<FormInput
			type="text"
			name="username"
			labelText="아이디"
			helperText="* 5~20자 사이의 영문 소문자/숫자 입력"
			placeholder="아이디를 입력하세요."
			icon={UserIcon}
		/>
		<FormInput
			type="password"
			name="password"
			labelText="비밀번호"
			helperText="* 8~20자 사이, 영문/숫자/특수 문자 중 2가지 이상 포함"
			placeholder="비밀번호를 입력하세요."
			icon={PasswordIcon}
		/>
		<FormInput
			type="password"
			name="confirm"
			labelText="비밀번호 확인"
			placeholder="앞선 비밀번호와 동일하게 작성하세요."
			icon={CheckIcon}
		/>

		<FormInput
			type="email"
			name="email"
			labelText="이메일"
			placeholder="이메일을 입력하세요."
			icon={EmailIcon}
		/>
	</div>

	<button type="submit" class="w-full btn variant-filled-primary">회원가입</button>
</form>
