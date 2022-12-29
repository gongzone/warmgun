import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  forwardRef,
  type InputProps,
} from '@chakra-ui/react'

interface CustomInputProps extends InputProps {
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

const CustomInput = forwardRef<CustomInputProps, 'input'>((props, ref) => {
  const {
    leftElement = '',
    rightElement = '',
    size = 'lg',
    bg = 'transparent',
    border = '2px',
    borderColor = 'gray.600',
    focusBorderColor = 'yellow.300',
    _hover = { borderColor: 'none' },
    ...rest
  } = props

  return (
    <InputGroup size={size}>
      {leftElement && <InputLeftElement pointerEvents="none" children={leftElement} />}
      <Input
        bg={bg}
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

export default CustomInput
