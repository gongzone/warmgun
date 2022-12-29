import { Box, List, ListItem, ListIcon, Text, Flex } from '@chakra-ui/react'
import shallow from 'zustand/shallow'
import { FiChevronRight } from 'react-icons/fi'

import useMobileNavStore from '~/stores/mobile-nav'

import CustomLink from '~/components/@custom/CustomLink'

const navItems = [
  { name: '홈으로', description: '', to: '/' },
  {
    name: 'Articles',
    description: '치열한 개발 이야기',
    to: '/articles',
  },
  {
    name: 'Warriors',
    description: '데브 워리어들의 블로그 탐방',
    to: '/writers',
  },
]

export default function MobileNav() {
  const [isOpen, toggleMobileNav] = useMobileNavStore(
    (state) => [state.isOpen, state.toggleMobileNav],
    shallow,
  )

  return (
    <Box pos="relative">
      <Box
        as="nav"
        pos="absolute"
        top="0"
        left="0"
        zIndex="30"
        overflowY="auto"
        w="full"
        transition="all 0.3s ease"
        visibility={isOpen ? 'visible' : 'hidden'}
        opacity={isOpen ? '1' : '0'}
        transform={isOpen ? 'translateY(0)' : 'translateY(-30px)'}
      >
        <List>
          {navItems.map((item, index) => (
            <ListItem
              onClick={toggleMobileNav}
              bg="#111"
              borderTop={index === 0 ? '1px' : ''}
              borderBottom="1px"
              borderColor="gray.800"
              key={item.name}
            >
              <CustomLink to={item.to} display="flex" alignItems="center" px="20px" py="28px">
                <ListIcon boxSize="14px" as={FiChevronRight} />
                <Flex flexDirection="column">
                  <Text fontWeight="bold">{item.name}</Text>
                  {item.description && (
                    <Text fontSize="sm" color="gray.600">
                      {item.description}
                    </Text>
                  )}
                </Flex>
              </CustomLink>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
