import {
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useActionData, useTransition } from '@remix-run/react'
import { FiShield, FiUser, FiCheckCircle, FiMail } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Link from '~/components/@custom/Link'
import Form from '~/components/@custom/Form'
import FormButton from '~/components/@custom/FormButton'
import FormInput from '~/components/@custom/FormInput'
import { type SignupBody, type AuthResult } from '~/libs/api/auth'
import { type AppError } from '~/libs/error'
import { Alert } from '~/components/@custom/Alert'
import { signupSchema } from '~/libs/schema'

interface SignupFormActionData {
  data?: AuthResult
  error?: AppError
}

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<SignupBody>({
    mode: 'onChange',
    defaultValues: { username: '', password: '', confirmPassword: '', email: '' },
    resolver: zodResolver(signupSchema),
  })

  console.log(isDirty, isValid)
  const actionData = useActionData<SignupFormActionData>()
  const transition = useTransition()

  console.log(errors.confirmPassword)

  return (
    <Form method="post">
      <FormControl isInvalid={!!errors.username}>
        <FormLabel>아이디</FormLabel>
        <FormInput
          type="text"
          leftElement={<FiUser color="gray.300" />}
          {...register('username')}
        />
        <FormHelperText>* 5~20자 사이의 영문 소문자/숫자 입력</FormHelperText>
        <FormErrorMessage>* {errors.username?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel>비밀번호</FormLabel>
        <FormInput
          type="password"
          leftElement={<FiShield color="gray.300" />}
          {...register('password')}
        />
        <FormHelperText>* 8자 이상, 영문/숫자/특수 문자 중 2가지 이상 입력</FormHelperText>
        <FormErrorMessage>* {errors.password?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.confirmPassword}>
        <FormLabel>비밀번호 확인</FormLabel>
        <FormInput
          type="password"
          leftElement={<FiCheckCircle color="gray.300" />}
          {...register('confirmPassword')}
        />
        <FormErrorMessage>* {errors.confirmPassword?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.email}>
        <FormLabel>이메일</FormLabel>
        <FormInput type="email" leftElement={<FiMail color="gray.300" />} {...register('email')} />
        <FormErrorMessage>* {errors.email?.message}</FormErrorMessage>
      </FormControl>

      {actionData?.error && <Alert status="error" message={actionData.error.message} />}

      <FormButton isLoading={transition.state !== 'idle'} disabled={!isDirty || !isValid}>
        회원가입
      </FormButton>

      <Flex gap="6px">
        <Text>계정이 이미 있으신가요?</Text>
        <Link fontWeight="bold" _hover={{ color: 'blue.500' }} to="/login">
          로그인
        </Link>
      </Flex>
    </Form>
  )
}
