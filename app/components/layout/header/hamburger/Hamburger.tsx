import { Box, Button, type BoxProps } from '@chakra-ui/react'
import shallow from 'zustand/shallow'

import useMobileNavStore from '~/stores/mobile-nav'

export default function Hamburger() {
  const [isOpen, toggleMobileNav] = useMobileNavStore(
    (state) => [state.isOpen, state.toggleMobileNav],
    shallow,
  )

  return (
    <Button onClick={toggleMobileNav} pos="relative">
      <Line top={isOpen ? '50%' : '30%'} transform={isOpen ? 'rotate(-315deg)' : ''} />
      <Line top="50%" opacity={isOpen ? '0' : '1'} />
      <Line top={isOpen ? '50%' : '70%'} transform={isOpen ? 'rotate(-225deg)' : ''} />
    </Button>
  )
}

interface LineProps extends BoxProps {}

function Line(props: LineProps) {
  const { top, transform = '', opacity = '1' } = props

  return (
    <Box
      w="55%"
      h="3px"
      bg="gray.800"
      borderRadius="25px"
      pos="absolute"
      top={top}
      left="50%"
      transform={`translate(-50%, -50%) ${transform}`}
      transition="transform 0.6s, opacity 0.8s, top 0.6s"
      opacity={opacity}
    ></Box>
  )
}
