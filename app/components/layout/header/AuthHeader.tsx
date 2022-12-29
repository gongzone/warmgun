import { Box, Heading, Text } from '@chakra-ui/react'

import CustonLink from '~/components/@custom/CustomLink'

export default function AuthHeader() {
  return (
    <Box
      display="flex"
      alignItems="center"
      as="header"
      h={{ base: '132px', sm: '148px', md: '162px' }}
      px={{ base: '24px', sm: '32px', md: '46px' }}
      py="20px"
    >
      <Box>
        <CustonLink _hover={{ color: 'yellow.300' }} to="/">
          <Heading display="inline" fontFamily="Macondo" fontWeight="normal">
            DevWarriors
          </Heading>
        </CustonLink>
        <Text>개발 커뮤니티 & 블로그 서비스</Text>
      </Box>
    </Box>
  )
}
