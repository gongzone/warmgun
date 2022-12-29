import { Form, useActionData, useTransition } from '@remix-run/react'
import { FormControl, FormLabel, Text, Flex } from '@chakra-ui/react'
import { FiUser, FiShield } from 'react-icons/fi'

import { type AppError } from '~/libs/error'

import Notification from '~/components/@custom/Notification'
import CustomLink from '~/components/@custom/CustomLink'
import CustomInput from '~/components/@custom/CustomInput'
import FormButton from '~/components/@custom/FormButton'

interface LoginFormActionData {
  error?: AppError
}

export default function LoginForm() {
  const actionData = useActionData<LoginFormActionData>()
  const transition = useTransition()

  const isIdle = transition.state === 'idle'

  return (
    <>
      <Notification
        state={!!actionData?.error && isIdle}
        title="로그인시 문제가 발생하였습니다."
        description={actionData?.error?.message}
      />
      <Form method="post" action="/login">
        <Flex direction="column" gap="24px">
          <FormControl isDisabled={!isIdle}>
            <FormLabel>아이디</FormLabel>
            <CustomInput type="text" name="username" leftElement={<FiUser color="gray.300" />} />
          </FormControl>

          <FormControl isDisabled={!isIdle}>
            <FormLabel>비밀번호</FormLabel>
            <CustomInput
              type="password"
              name="password"
              leftElement={<FiShield color="gray.300" />}
            />
          </FormControl>

          <FormButton isLoading={!isIdle} mt="12px">
            로그인
          </FormButton>

          <Flex gap="6px" justifyContent="center">
            <Text>계정이 없으신가요?</Text>
            <CustomLink fontWeight="bold" _hover={{ color: 'blue.500' }} to="/signup">
              회원가입
            </CustomLink>
          </Flex>
        </Flex>
      </Form>
    </>
  )
}
