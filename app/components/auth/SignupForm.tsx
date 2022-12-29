import {
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Form, useActionData, useTransition } from '@remix-run/react'
import { FiShield, FiUser, FiCheckCircle, FiMail } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { type SignupBody } from '~/libs/api/auth'
import { type AppError } from '~/libs/error'
import { signupSchema } from '~/libs/schema'

import CustomLink from '~/components/@custom/CustomLink'
import FormButton from '~/components/@custom/FormButton'
import CustomInput from '~/components/@custom/CustomInput'
import Notification from '~/components/@custom/Notification'

interface SignupFormActionData {
  error?: AppError
}

export default function SignupForm() {
  const {
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<SignupBody>({
    mode: 'onChange',
    defaultValues: { username: '', password: '', confirmPassword: '', email: '' },
    resolver: zodResolver(signupSchema),
  })

  const actionData = useActionData<SignupFormActionData>()
  const transition = useTransition()

  const isIdle = transition.state === 'idle'

  return (
    <>
      <Notification
        state={!!actionData?.error && isIdle}
        title="회원가입 과정에서 문제가 발생하였습니다."
        description={actionData?.error?.message}
      />
      <Form method="post">
        <Flex direction="column" gap="24px">
          <FormControl isDisabled={!isIdle} isInvalid={!!errors.username}>
            <FormLabel>아이디</FormLabel>
            <CustomInput
              type="text"
              leftElement={<FiUser color="gray.300" />}
              {...register('username')}
            />
            <FormHelperText>* 5~20자 사이의 영문 소문자/숫자 입력</FormHelperText>
            <FormErrorMessage>* {errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isDisabled={!isIdle} isInvalid={!!errors.password}>
            <FormLabel>비밀번호</FormLabel>
            <CustomInput
              type="password"
              leftElement={<FiShield color="gray.300" />}
              {...register('password')}
            />
            <FormHelperText>* 8~20자 사이, 영문/숫자/특수 문자 중 2가지 이상 포함</FormHelperText>
            <FormErrorMessage>* {errors.password?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isDisabled={!isIdle} isInvalid={!!errors.confirmPassword}>
            <FormLabel>비밀번호 확인</FormLabel>
            <CustomInput
              type="password"
              leftElement={<FiCheckCircle color="gray.300" />}
              {...register('confirmPassword')}
            />
            <FormErrorMessage>* {errors.confirmPassword?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isDisabled={!isIdle} isInvalid={!!errors.email}>
            <FormLabel>이메일</FormLabel>
            <CustomInput
              type="email"
              leftElement={<FiMail color="gray.300" />}
              {...register('email')}
            />
            <FormErrorMessage>* {errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormButton isLoading={!isIdle} disabled={!isDirty || !isValid} mt="12px">
            회원가입
          </FormButton>

          <Flex gap="6px">
            <Text>계정이 이미 있으신가요?</Text>
            <CustomLink fontWeight="bold" _hover={{ color: 'blue.500' }} to="/login">
              로그인
            </CustomLink>
          </Flex>
        </Flex>
      </Form>
    </>
  )
}
