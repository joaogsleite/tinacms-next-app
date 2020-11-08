import { ExitIcon } from '@tinacms/icons'
import { logout } from '../services/github/login'
import { LoadingDots } from '@tinacms/react-forms'
import { IconButton  } from '@tinacms/styles'
import { useCallback, useState } from 'react'
import { useCMS } from 'tinacms'

function ToolbarWidgetComponent() {
  const [busy, setBusy] = useState(false)
  const cms = useCMS()
  const handleClick = useCallback(async () => {
    setBusy(true)
    await logout()
    cms.disable()
  }, [])
  return <>
    {busy
      ? <LoadingDots color="#2296fe" />
      : <IconButton onButton busy={busy} disabled={busy} onClick={handleClick}>
          <ExitIcon />
        </IconButton>
    }
  </>
}

export const ToolbarWidget = {
  __type: 'toolbar:widget',
  name: 'logout',
  weight: 100000,
  component: ToolbarWidgetComponent,
}