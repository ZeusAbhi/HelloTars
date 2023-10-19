import Navbar from '@/components/navbar'
import { ThemeProvider } from '@/context/themeContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  </>
}
