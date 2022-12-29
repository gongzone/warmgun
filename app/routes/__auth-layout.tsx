import { Outlet } from '@remix-run/react'
import { Box, Container, Heading } from '@chakra-ui/react'

import MainLayout from '~/components/layout/MainLayout'
import AuthHeader from '~/components/layout/header/AuthHeader'

export default function authLayout() {
  return (
    <MainLayout header={<AuthHeader />} px={{ base: '24px', sm: '32px', md: '46px' }}>
      <Container maxW="432px" px="0px">
        <Box mb="36px">
          <Heading>Simplicity</Heading>
          <Heading>is the soul of efficiency</Heading>
        </Box>
        <Outlet />
      </Container>
    </MainLayout>
  )
}
