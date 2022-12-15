import { Form as RemixForm, type FormProps as RemixFormProps } from '@remix-run/react'
import { Box, Flex, type FlexProps } from '@chakra-ui/react'

interface FormProps extends RemixFormProps {
  children?: React.ReactNode
}

export default function Form(props: FormProps) {
  const { children, ...rest } = props

  return (
    <RemixForm {...rest}>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" gap="24px">
        {children}
      </Flex>
    </RemixForm>
  )
}
