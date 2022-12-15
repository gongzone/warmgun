import {
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  Text,
  Button,
  Box,
} from '@chakra-ui/react'
import shallow from 'zustand/shallow'

import useMobileNavStore from '~/stores/mobile-nav'

import Link from '~/components/@custom/Link'

export default function AvartarPopover() {
  const [isMobileNavOpen, toggleMobileNav] = useMobileNavStore(
    (state) => [state.isOpen, state.toggleMobileNav],
    shallow,
  )

  return (
    <Popover>
      {({ isOpen, onClose }) => (
        <Box zIndex="40">
          <PopoverTrigger>
            <Avatar
              as="button"
              w="40px"
              h="40px"
              onClick={isMobileNavOpen ? toggleMobileNav : () => {}}
              ring={isOpen ? '4px' : ''}
              ringColor={isOpen ? 'gray.200' : ''}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>로그인된 계정이 없습니다.</PopoverHeader>
            <Box p="12px">
              <PopoverBody
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="8px"
                border="0"
              >
                <Avatar size="lg" />
                <Box textAlign="center" fontFamily="Fredoka One" fontSize="2xl">
                  <Text>Hello DevWarrior!</Text>
                  <Text>Join us?</Text>
                </Box>
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="center" gap="12px" border="0">
                <Link to="/login">
                  <Button variant="outline" onClick={onClose} colorScheme="teal">
                    로그인
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" onClick={onClose} colorScheme="facebook">
                    회원가입
                  </Button>
                </Link>
              </PopoverFooter>
            </Box>
          </PopoverContent>
        </Box>
      )}
    </Popover>
  )
}
