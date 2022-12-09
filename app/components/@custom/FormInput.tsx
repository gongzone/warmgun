import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  type InputProps,
} from '@chakra-ui/react'

interface FormInputProps extends InputProps {
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

export default function FormInput(props: FormInputProps) {
  const {
    leftElement = '',
    rightElement = '',
    size = 'lg',
    border = '2px',
    borderColor = 'gray.500',
    _hover = { borderColor: 'none' },
    focusBorderColor = 'gray.600',
    ...rest
  } = props

  return (
    <InputGroup size={size}>
      <InputLeftElement pointerEvents="none" children={leftElement} />
      <Input
        border={border}
        borderColor={borderColor}
        _hover={_hover}
        focusBorderColor={focusBorderColor}
        {...rest}
      />
      <InputRightElement children={rightElement} />
    </InputGroup>
  )
}
