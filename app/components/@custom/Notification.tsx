import { useEffect, useRef } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react'

interface NotificationProps {
  state: boolean
  title?: string
  description?: string
}

export default function Notification({
  state,
  title = '정보 알림',
  description = '설명을 추가해주세요',
}: NotificationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef(null)

  useEffect(() => {
    if (state) {
      onOpen()
    }
  }, [state])

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={ref}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{description}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={ref} onClick={onClose}>
            확인
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
