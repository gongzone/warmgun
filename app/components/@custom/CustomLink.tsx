import { Link as RemixLink, type LinkProps as RemixLinkProps } from '@remix-run/react'
import { Link as ChakraLink, type LinkProps as ChakraLinkProps } from '@chakra-ui/react'

interface CustomLinkProps extends ChakraLinkProps, Omit<RemixLinkProps, 'color'> {
  children?: React.ReactNode
}

export default function CustomLink(props: CustomLinkProps) {
  const { children, ...rest } = props

  return (
    <ChakraLink as={RemixLink} {...rest}>
      {children}
    </ChakraLink>
  )
}
