import NotoSansKR from '@fontsource/noto-sans-kr/index.css'
import FredokaOne from '@fontsource/fredoka-one/index.css'

import React, { useContext, useEffect } from 'react'
import { withEmotionCache } from '@emotion/react'
import { extendTheme, ChakraProvider, defineStyleConfig } from '@chakra-ui/react'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import type { MetaFunction, LinksFunction, LoaderFunction } from '@remix-run/node'

import { ServerStyleContext, ClientStyleContext } from './context'
import { setClientCookie } from './libs/client'
import { getMe, type GetMeResult } from './libs/api/user'

const styles = {
  global: {
    'html, body': {},
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
  styles,
  fonts,
  colors,
  components: {
    Button,
    Link,
  },
})

export default function App() {
  const data = useLoaderData<GetMeResult | null>()

  return (
    <Document>
      <ChakraProvider theme={theme} resetCSS={true}>
        <Outlet />
      </ChakraProvider>
    </Document>
  )
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = request.headers.get('Cookie')

  if (!cookie) return null

  setClientCookie(cookie)

  try {
    const me = await getMe()
    return me
  } catch (err) {
    return null
  }
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export let links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: NotoSansKR,
    },
    {
      rel: 'stylesheet',
      href: FredokaOne,
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
    },
  ]
}

interface DocumentProps {
  children: React.ReactNode
}

const Document = withEmotionCache(({ children }: DocumentProps, emotionCache) => {
  const serverStyleData = useContext(ServerStyleContext)
  const clientStyleData = useContext(ClientStyleContext)

  // Only executed on client
  useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head
    // re-inject tags
    const tags = emotionCache.sheet.tags
    emotionCache.sheet.flush()
    tags.forEach((tag) => {
      ;(emotionCache.sheet as any)._insertTag(tag)
    })
    // reset cache to reapply global styles
    clientStyleData?.reset()
  }, [])

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {serverStyleData?.map(({ key, ids, css }) => (
          <style
            key={key}
            data-emotion={`${key} ${ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        ))}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
})
