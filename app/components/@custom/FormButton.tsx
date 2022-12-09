import { Button, type ButtonProps, Icon } from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'

interface FormButtonProps extends ButtonProps {
  children?: React.ReactNode
}

export default function FormButton(props: FormButtonProps) {
  const { children, ...rest } = props

  return (
    <Button
      type="submit"
      role="group"
      rightIcon={
        <Icon
          as={FiArrowRight}
          _groupHover={{ transform: 'translateX(10px)' }}
          transition="transform 0.3s ease"
        />
      }
      w="full"
      mt="12px"
      color="whitesmoke"
      borderColor="gray.600"
      bgGradient="linear(to-r, #2b5876, #4e4376)"
      _hover={{
        bg: '',
      }}
      borderRadius="full"
      size="lg"
      fontSize="md"
      {...rest}
    >
      {children}
    </Button>
  )
}
