import { Box, Flex, HStack } from '@chakra-ui/react'
import { Link } from '@remix-run/react'

import MainLogo from '~/components/@svg/MainLogo'
import MobileNav from './mobile-nav/MobileNav'
import Hamburger from './hamburger/Hamburger'
import AvartarPopover from './avartar-popover/AvartarPopover'

export default function Header() {
  return (
    <>
      <Box as="header" h="132px" p="20px">
        <Flex w="full" h="full" justify="space-between" align="center">
          <Link to="/">
            <MainLogo width={200} />
          </Link>

          <HStack align="center" spacing="14px">
            <Hamburger />
            <AvartarPopover />
          </HStack>
        </Flex>
      </Box>
      <MobileNav />
    </>
  )
}
