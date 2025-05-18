import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import AuthGuard from '@/components/AuthGuard'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthGuard>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthGuard>
  )
}