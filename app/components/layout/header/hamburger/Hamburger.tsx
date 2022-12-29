import { Box, Button, Circle, type BoxProps } from '@chakra-ui/react'
import shallow from 'zustand/shallow'

import useMobileNavStore from '~/stores/mobile-nav'

export default function Hamburger() {
  const [isOpen, toggleMobileNav] = useMobileNavStore(
    (state) => [state.isOpen, state.toggleMobileNav],
    shallow,
  )

  return (
    <Button display="flex" variant="unstyled" role="group" onClick={toggleMobileNav}>
      <Circle
        pos="relative"
        size="46px"
        borderWidth="2px"
        borderColor="gray.700"
        _groupHover={{ borderColor: 'gray.300' }}
      >
        <Line top={isOpen ? '50%' : '32.5%'} transform={isOpen ? 'rotate(-315deg)' : ''} />
        <Line top="50%" opacity={isOpen ? '0' : '1'} />
        <Line top={isOpen ? '50%' : '67.5%'} transform={isOpen ? 'rotate(-225deg)' : ''} />
      </Circle>
    </Button>
  )
}

interface LineProps extends BoxProps {}

function Line(props: LineProps) {
  const { top, transform = '', opacity = '1' } = props

  return (
    <Box
      w="48%"
      h="2.5px"
      bg="whitesmoke"
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
