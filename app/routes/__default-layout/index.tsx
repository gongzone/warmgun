import { type LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async ({ request }) => {
  console.log('index loader 작동')

  return null
}

export default function IndexRoute() {
  return <>인덱스 페이지</>
}
