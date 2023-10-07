import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Signika_Negative} from '@next/font/google'

const gabarito = Signika_Negative({weight:'700', subsets:['vietnamese']});

export default function App({ Component, pageProps }: AppProps) {
  return <main className={gabarito.className}>
     <Component {...pageProps} />
  </main>
 
}
