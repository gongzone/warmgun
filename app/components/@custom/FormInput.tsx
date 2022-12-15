import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  type InputProps,
  forwardRef,
} from '@chakra-ui/react'

interface FormInputProps extends InputProps {
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

const FormInput = forwardRef<FormInputProps, 'input'>((props, ref) => {
  const {
    leftElement = '',
    rightElement = '',
    size = 'lg',
    border = '2px',
    borderColor = 'gray.500',
    focusBorderColor = 'gray.600',
    _hover = { borderColor: 'none' },
    ...rest
  } = props

  return (
    <InputGroup size={size}>
      <InputLeftElement pointerEvents="none" children={leftElement} />
      <Input
        border={border}
        borderColor={borderColor}
        focusBorderColor={focusBorderColor}
        _hover={_hover}
        _placeholder={{ fontSize: 'sm' }}
        ref={ref}
        {...rest}
      />
      {rightElement && <InputRightElement children={rightElement} />}
    </InputGroup>
  )
})

export default FormInput

// export default function FormInput(props: FormInputProps) {
//   const {
//     leftElement = '',
//     rightElement = '',
//     size = 'lg',
//     border = '2px',
//     borderColor = 'gray.500',
//     focusBorderColor = 'gray.600',
//     _hover = { borderColor: 'none' },
//     ...rest
//   } = props

//   return (
//     <InputGroup size={size}>
//       <InputLeftElement pointerEvents="none" children={leftElement} />
//       <Input
//         border={border}
//         borderColor={borderColor}
//         focusBorderColor={focusBorderColor}
//         _hover={_hover}
//         _placeholder={{ fontSize: 'sm' }}
//         {...rest}
//       />
//       {rightElement && <InputRightElement children={rightElement} />}
//     </InputGroup>
//   )
// }
