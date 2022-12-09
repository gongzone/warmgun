import { Box } from '@chakra-ui/react'

import Link from '~/components/@custom/Link'
import MainLogo from '~/components/@svg/MainLogo'

export default function AuthHeader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      as="header"
      h="132px"
      p="20px"
      borderBottom="1px"
      borderBottomColor="gray.300"
    >
      <Link to="/" p="16px">
        <MainLogo width={200} />
      </Link>
    </Box>
  )
}
