import { FormControl, FormLabel, FormErrorMessage, Text, Flex } from '@chakra-ui/react'
import { FiUser, FiShield } from 'react-icons/fi'

import Form from '~/components/@custom/Form'
import FormInput from '~/components/@custom/FormInput'
import FormButton from '~/components/@custom/FormButton'
import Link from '~/components/@custom/Link'

export default function LoginForm() {
  return (
    <Form method="post">
      <FormControl>
        <FormLabel>아이디</FormLabel>
        <FormInput type="text" name="username" leftElement={<FiUser color="gray.300" />} />
      </FormControl>

      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <FormInput type="password" name="password" leftElement={<FiShield color="gray.300" />} />
      </FormControl>

      <FormButton>로그인</FormButton>

      <Flex gap="6px">
        <Text>계정이 없으신가요?</Text>
        <Link fontWeight="bold" _hover={{ color: 'blue.500' }} to="/signup">
          회원가입
        </Link>
      </Flex>
    </Form>
  )
}
