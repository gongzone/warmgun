import { Box, Heading, Text } from '@chakra-ui/react'

import Link from '~/components/@custom/Link'

export default function AuthHeader() {
  return (
    <Box
      as="header"
      h={{ base: '124px', sm: '136px', md: '146px' }}
      px={{ base: '24px', sm: '32px', md: '36px' }}
      pt={{ base: '28px', sm: '32px', md: '36px' }}
      pb="20px"
    >
      <Link _hover={{ color: 'yellow.300' }} to="/">
        <Heading display="inline" fontFamily="Macondo" fontWeight="normal">
          DevWarriors
        </Heading>
      </Link>
      <Text>개발 커뮤니티 & 블로그 서비스</Text>
    </Box>
  )
}
