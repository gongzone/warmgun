import {
  type AlertProps as ChakraAlertProps,
  Alert as ChakraAlert,
  AlertIcon,
  AlertTitle,
  keyframes,
} from '@chakra-ui/react'

interface AlertProps extends ChakraAlertProps {
  message: string
}

const animationKeyFrames = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`

const shakingAnimation = `${animationKeyFrames} 0.82s cubic-bezier(.36,.07,.19,.97) both`

export function Alert(props: AlertProps) {
  const { message, ...rest } = props
  return (
    <ChakraAlert animation={shakingAnimation} {...rest}>
      <AlertIcon />
      <AlertTitle>{message}</AlertTitle>
    </ChakraAlert>
  )
}
