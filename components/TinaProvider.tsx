import LocalStorage from '../services/localStorage'
import { TinaCMS, TinaProvider as OriginalProvider } from 'tinacms'
import { DateFieldPlugin } from "react-tinacms-date"

import { EditButton } from '../components/EditButton'
import { ToolbarWidget } from './ToolbarWidget'
import { PostCreatorPlugin } from '../pages/posts/new'
import { useEffect } from 'react'
import { isLoggedIn } from '../services/login'

export const TinaProvider = ({ children }) => {
  const cms = new TinaCMS({ 
    toolbar: true,
  })
  cms.plugins.add(DateFieldPlugin)
  cms.plugins.add(ToolbarWidget)
  cms.plugins.add(PostCreatorPlugin)
  useEffect(() => {
    if (LocalStorage.cmsEnabled && !cms.enabled) {
      cms.enable()
      isLoggedIn().then((login) => {
        if (!login) {
          cms.disable()
          LocalStorage.cmsEnabled = false
        }
      })
    }
  }, [cms])
  return (
    <OriginalProvider cms={cms}>
      <EditButton />
      {children}
    </OriginalProvider>
  )
}