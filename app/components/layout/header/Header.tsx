import { Box, Flex, Heading, HStack } from '@chakra-ui/react'

import Link from '~/components/@custom/Link'
import MobileNav from './mobile-nav/MobileNav'
import Hamburger from './hamburger/Hamburger'
import AvartarPopover from './avartar-popover/AvartarPopover'

export default function Header() {
  return (
    <>
      <Box
        as="header"
        h={{ base: '132px', md: '162px' }}
        px={{ base: '24px', sm: '32px', md: '36px' }}
        py="20px"
      >
        <Flex w="full" h="full" justify="space-between" align="center">
          <Link _hover={{ color: 'yellow.300' }} to="/" py="16px">
            <Heading fontFamily="Macondo" fontWeight="normal">
              DevWarriors
            </Heading>
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
