import {
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  Link,
  Text,
  Button,
  Box,
} from '@chakra-ui/react'
import shallow from 'zustand/shallow'

import useMobileNavStore from '~/stores/mobile-nav'

import { Link as RemixLink } from '@remix-run/react'

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
                <Box textAlign="center">
                  <Text fontFamily="Kenia" fontSize="2xl">
                    Hello DevWarrior!
                  </Text>
                  <Text fontFamily="Kenia" fontSize="2xl">
                    Join us?
                  </Text>
                </Box>
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="center" border="0">
                <Link as={RemixLink} to="/auth">
                  <Button onClick={onClose} colorScheme="teal">
                    로그인 / 회원가입
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
