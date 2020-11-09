import LocalStorage from '../services/localStorage'
import { ExitIcon } from '@tinacms/icons'
import { useCallback, useState } from 'react'
import { LoadingDots } from '@tinacms/react-forms'
import { IconButton  } from '@tinacms/styles'
import { useCMS } from 'tinacms'
import { logout } from '../services/login'

function ToolbarWidgetComponent() {
  const [busy, setBusy] = useState(false)
  const cms = useCMS()
  const handleClick = useCallback(async () => {
    setBusy(true)
    await logout()
    LocalStorage.cmsEnabled = false
    cms.disable()
  }, [])
  return <>
    {busy
      ? <LoadingDots color="#2296fe" />
      : <IconButton busy={busy} disabled={busy} onClick={handleClick}>
          <ExitIcon />
        </IconButton>
    }
  </>
}

export const ToolbarWidget = {
  __type: 'toolbar:widget',
  name: 'toolbarwidget',
  weight: 1,
  component: ToolbarWidgetComponent,
}