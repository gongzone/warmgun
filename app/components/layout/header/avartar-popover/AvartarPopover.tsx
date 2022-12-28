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
import Form from '~/components/@custom/Form'
import { useLoaderData } from '@remix-run/react'

export default function AvartarPopover() {
  const [isMobileNavOpen, toggleMobileNav] = useMobileNavStore(
    (state) => [state.isOpen, state.toggleMobileNav],
    shallow,
  )

  const { user } = useLoaderData()
  console.log(user)

  return (
    <Popover arrowShadowColor="#424242">
      {({ isOpen, onClose }) => (
        <Box zIndex="40">
          <PopoverTrigger>
            <Avatar
              src={user?.character.image}
              as="button"
              w="40px"
              h="40px"
              onClick={isMobileNavOpen ? toggleMobileNav : () => {}}
            />
          </PopoverTrigger>
          <PopoverContent bg="rgb(30 30 30)" borderColor="gray.800">
            <PopoverArrow bg="rgb(30 30 30)" />
            <PopoverHeader borderColor="gray.800">로그인된 계정이 없습니다.</PopoverHeader>
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
                {!user && (
                  <>
                    <Link to="/login">
                      <Button onClick={onClose} colorScheme="teal">
                        로그인
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button onClick={onClose} colorScheme="facebook">
                        회원가입
                      </Button>
                    </Link>
                  </>
                )}

                {user && (
                  <>
                    <Form method="post" action="/logout">
                      <Button type="submit" onClick={onClose}>
                        로그아웃
                      </Button>
                    </Form>
                  </>
                )}
              </PopoverFooter>
            </Box>
          </PopoverContent>
        </Box>
      )}
    </Popover>
  )
}
