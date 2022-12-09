import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { FiUser, FiShield } from 'react-icons/fi'

import Form from '~/components/@custom/Form'
import FormInput from '~/components/@custom/FormInput'
import FormButton from '~/components/@custom/FormButton'

export default function LoginForm() {
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

      <FormButton>로그인</FormButton>
    </Form>
  )
}

//  .btn-grad {
//     background-image: linear-gradient(to right, #2b5876 0%, #4e4376  51%, #2b5876  100%);
//     margin: 10px;
//     padding: 15px 45px;
//     text-align: center;
//     text-transform: uppercase;
//     transition: 0.5s;
//     background-size: 200% auto;
//     color: white;
//     box-shadow: 0 0 20px #eee;
//     border-radius: 10px;
//     display: block;
//   }

//   .btn-grad:hover {
//     background-position: right center; /* change the direction of the change here */
//     color: #fff;
//     text-decoration: none;
//   }
