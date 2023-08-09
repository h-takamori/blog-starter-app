import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const { session, ...otherPageProps } = pageProps
  return (
    <SessionProvider session={session}>
      <Component {...otherPageProps} />
    </SessionProvider>
  )
}
