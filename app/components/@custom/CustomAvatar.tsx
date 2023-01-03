import { Avatar, type AvatarProps, forwardRef } from '@chakra-ui/react'

interface CustomAvatarProps extends AvatarProps {}

const CustomAvatar = forwardRef<CustomAvatarProps, 'span'>((props, ref) => {
  return <Avatar bg="rgb(30 30 30)" borderWidth="2px" borderColor="gray.700" ref={ref} {...props} />
})

export default CustomAvatar
