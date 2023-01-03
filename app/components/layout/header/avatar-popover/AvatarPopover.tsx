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
import { useLoaderData, Form } from '@remix-run/react'

import useMobileNavStore from '~/stores/mobile-nav'

import CustomLink from '~/components/@custom/CustomLink'
import CustomAvatar from '~/components/@custom/CustomAvatar'
import { GetMeResult } from '~/libs/api/user'

export default function AvatarPopover() {
  const { user } = useLoaderData<{ user: GetMeResult | null }>()
  const [isMobileNavOpen, toggleMobileNav] = useMobileNavStore(
    (state) => [state.isOpen, state.toggleMobileNav],
    shallow,
  )

  return (
    <Popover placement="bottom" arrowShadowColor="#424242">
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <CustomAvatar
              as="button"
              src={user?.character.image}
              onClick={isMobileNavOpen ? toggleMobileNav : () => {}}
            />
          </PopoverTrigger>
          <PopoverContent bg="rgb(30 30 30)" borderColor="gray.800">
            <PopoverArrow bg="rgb(30 30 30)" />
            <PopoverHeader borderColor="gray.800">
              {user ? `${user.username}님 환영합니다.` : '로그인된 계정이 없습니다.'}
            </PopoverHeader>
            <Box p="16px">
              <PopoverBody
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="8px"
                border="0"
              >
                <CustomAvatar src={user?.character.image} size="lg" />
                <Box>
                  <CustomLink to="/">내 블로그</CustomLink>
                </Box>
                {!user && (
                  <Box textAlign="center" fontFamily="Macondo" fontSize="2xl">
                    <Text>Hello DevWarrior!</Text>
                    <Text>Join us?</Text>
                  </Box>
                )}
              </PopoverBody>
              <PopoverFooter
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="12px"
                border="0"
              >
                {!user && (
                  <>
                    <CustomLink to="/login">
                      <Button variant="link" onClick={onClose} colorScheme="teal">
                        로그인
                      </Button>
                    </CustomLink>
                    <Text fontSize="sm">OR</Text>
                    <CustomLink to="/signup">
                      <Button variant="link" onClick={onClose} colorScheme="yellow">
                        회원가입
                      </Button>
                    </CustomLink>
                  </>
                )}

                {user && (
                  <>
                    <Form method="post" action="/logout">
                      <Button variant="link" type="submit" onClick={onClose} colorScheme="teal">
                        로그아웃
                      </Button>
                    </Form>
                  </>
                )}
              </PopoverFooter>
            </Box>
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}
