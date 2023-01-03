import { Box, Heading, HStack } from '@chakra-ui/react'

import CustomLink from '~/components/@custom/CustomLink'
import MobileNav from './mobile-nav/MobileNav'
import Hamburger from './hamburger/Hamburger'
import AvatarPopover from './avatar-popover/AvatarPopover'

export default function Header() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        as="header"
        h={{ base: '132px', sm: '148px', md: '162px' }}
        px={{ base: '24px', sm: '32px', md: '46px' }}
        py="20px"
      >
        <CustomLink _hover={{ color: 'yellow.300' }} to="/" py="16px">
          <Heading fontFamily="Macondo" fontWeight="normal">
            DevWarriors
          </Heading>
        </CustomLink>

        <HStack align="center" spacing="14px">
          <Hamburger />
          <AvatarPopover />
        </HStack>
      </Box>
      <MobileNav />
    </>
  )
}
