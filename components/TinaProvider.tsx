import { TinaCMS, TinaProvider as OriginalProvider } from 'tinacms'
import { DateFieldPlugin } from "react-tinacms-date"

import { EditButton } from '../components/EditButton'
import { ToolbarWidget } from './ToolbarWidget'
import { PostCreatorPlugin } from '../pages/posts/new'
import { useEffect } from 'react'

const localStorage = process.browser ? window.localStorage : undefined

export const TinaProvider = ({ children }) => {
  const cms = new TinaCMS({ 
    toolbar: true,
  })
  cms.plugins.add(DateFieldPlugin)
  cms.plugins.add(ToolbarWidget)
  cms.plugins.add(PostCreatorPlugin)
  cms.events.subscribe('cms:enable', () => {
    localStorage?.setItem('TINACMS_ENABLED', 'true')
    import('react-tinacms-editor').then(({ HtmlFieldPlugin }) => {
      cms.plugins.add(HtmlFieldPlugin)
    })
  })
  useEffect(() => {
    if (!!localStorage?.getItem('TINACMS_ENABLED') && !cms.enabled) {
      cms.enable()
    }
  }, [cms])
  return (
    <OriginalProvider cms={cms}>
      <EditButton />
      {children}
    </OriginalProvider>
  )
}