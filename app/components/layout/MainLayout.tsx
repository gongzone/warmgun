import { Box, type BoxProps } from '@chakra-ui/react'
import Header from './header/Header'

interface MainLayoutProps extends BoxProps {
  header?: React.ReactNode
  footer?: React.ReactNode
}

export default function MainLayout(props: MainLayoutProps) {
  const { header = <Header />, footer, children, ...rest } = props

  return (
    <>
      {header}
      <Box as="main" {...rest}>
        {children}
      </Box>
      {footer}
    </>
  )
}
