import { Provider as RecostProvider } from '../reducers'
import { TinaProvider } from '../components/TinaProvider'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <RecostProvider>
      <TinaProvider>
        <Component {...pageProps} />
      </TinaProvider>
    </RecostProvider>
  )
}