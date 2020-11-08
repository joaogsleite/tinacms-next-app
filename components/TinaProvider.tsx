import { TinaCMS, TinaProvider as OriginalProvider } from 'tinacms'
import { EditButton } from '../components/EditButton'
import { ToolbarWidget } from './ToolbarWidget'

export const TinaProvider = ({ children }) => {
  const cms = new TinaCMS({
    toolbar: true
  })
  cms.plugins.add(ToolbarWidget)
  cms.events.subscribe('cms:enable', () => {
    import('react-tinacms-editor').then(({ HtmlFieldPlugin }) => {
      cms.plugins.add(HtmlFieldPlugin)
    })
  })
  return (
    <OriginalProvider cms={cms}>
      <EditButton />
      {children}
    </OriginalProvider>
  )
}