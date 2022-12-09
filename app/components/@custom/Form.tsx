import { Flex, type FlexProps } from '@chakra-ui/react'

interface FormProps extends FlexProps {
  children?: React.ReactNode
}

export default function Form(props: FormProps) {
  const { children, ...rest } = props

  return (
    <Flex
      as="form"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="24px"
      {...rest}
    >
      {children}
    </Flex>
  )
}
