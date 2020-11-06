import { TinaCMS, TinaProvider as OriginalProvider } from 'tinacms'
import { EditButton } from '../components/EditButton'

export const TinaProvider = ({ children }) => {
  const cms = new TinaCMS({
    toolbar: true
  })
  return (
    <OriginalProvider cms={cms}>
      <EditButton />
      {children}
    </OriginalProvider>
  )
}