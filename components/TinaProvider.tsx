import Router from 'next/router'
import { TinaCMS, TinaProvider as OriginalProvider } from 'tinacms'
import { DateFieldPlugin } from "react-tinacms-date"

import { EditButton } from '../components/EditButton'
import { ToolbarWidget } from './ToolbarWidget'
import { PostCreatorPlugin } from '../pages/posts/new'

export const TinaProvider = ({ enabled, children }) => {
  const cms = new TinaCMS({
    enabled,
    toolbar: true
  })
  cms.plugins.add(DateFieldPlugin)
  cms.plugins.add(ToolbarWidget)
  cms.plugins.add(PostCreatorPlugin)
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