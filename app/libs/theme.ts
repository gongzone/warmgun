import { defineStyleConfig, extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  useSystemColorMode: false,
}

const styles = {
  global: {
    'html, body': {
      bg: '#111',
      color: 'whitesmoke',
    },
  },
}

const fonts = {
  body: `'Noto Sans KR', sans-serif`,
}

const colors = {
  gray: {
    100: '#F5f5f5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
}

const Button = defineStyleConfig({
  variants: {
    link: {
      ':focus': {
        outline: 'none',
        boxShadow: 'none',
      },
    },
  },
})

const Link = defineStyleConfig({
  baseStyle: {
    '&:hover': { textDecoration: 'none' },
  },
})

const theme = extendTheme({
  config,
  styles,
  fonts,
  colors,
  components: {
    Button,
    Link,
  },
})

export default theme
