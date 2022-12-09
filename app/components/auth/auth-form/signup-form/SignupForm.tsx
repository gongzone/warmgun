import { FormControl, FormLabel } from '@chakra-ui/react'
import { FiShield, FiUser } from 'react-icons/fi'

import Form from '~/components/@custom/Form'
import FormButton from '~/components/@custom/FormButton'
import FormInput from '~/components/@custom/FormInput'

export default function SignupForm() {
  return (
    <Form>
      <FormControl>
        <FormLabel>아이디</FormLabel>
        <FormInput type="text" leftElement={<FiUser color="gray.300" />} />
      </FormControl>

      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <FormInput type="password" leftElement={<FiShield color="gray.300" />} />
      </FormControl>

      <FormButton>회원가입</FormButton>
    </Form>
  )
}
