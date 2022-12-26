import NotoSansKR from '@fontsource/noto-sans-kr/index.css'
import FredokaOne from '@fontsource/fredoka-one/index.css'

import React, { useContext, useEffect } from 'react'
import { withEmotionCache } from '@emotion/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { type MetaFunction, type LinksFunction, type LoaderFunction } from '@remix-run/node'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useDehydratedState } from 'use-dehydrated-state'

import { ServerStyleContext, ClientStyleContext } from './context'
import theme from './libs/theme'
import { refreshAuth } from './libs/session'

export default function App() {
  const [queryClient] = React.useState(() => new QueryClient())
  const dehydratedState = useDehydratedState()

  return (
    <Document>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <ChakraProvider theme={theme} resetCSS={true}>
            <Outlet />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </Document>
  )
}

export const loader: LoaderFunction = async ({ request }) => {
  console.log('root loader 작동')

  await refreshAuth(request, { requiredAuth: false })

  return null
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
