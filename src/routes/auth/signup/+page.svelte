<script lang="ts">
  import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
  import { Alert } from '@skeletonlabs/skeleton';

  export let form: ActionData; 
</script>

<form method="POST" use:enhance>
  <div class="flex flex-col gap-5 mb-8" >
    <Alert visible={!!form?.message}>
      <svelte:fragment slot="lead"><span class="text-4xl">⚠️</span></svelte:fragment>
      <svelte:fragment slot="title"><h3 class="text-xl font-bold">오, 이럴수가!</h3></svelte:fragment>
      <span>{form?.message}</span>
    </Alert>
    
    <label for="username">
      <span>아이디</span>
      <input type="text" name="username" id="username" required>
      <span class="mt-2 mb-0">* 5~20자 사이의 영문 소문자/숫자 입력</span>
    </label>
  
    <label for="password">
      <span>비밀번호</span>
      <input type="password" name="password" id="password" required>
      <span class="mt-2 mb-0">* 8~20자 사이, 영문/숫자/특수 문자 중 2가지 이상 포함</span>
    </label>
  
    <label for="confirmPassword">
      <span>비밀번호 확인</span>
      <input type="password" name="confirmPassword" id="confirmPassword" required>
    </label>
  
    <label for="email">
      <span>이메일</span>
      <input type="email" name="email" id="email" required>
    </label>
  </div>

  <button class="w-full btn btn-filled-primary btn-base">회원가입</button>
</form>