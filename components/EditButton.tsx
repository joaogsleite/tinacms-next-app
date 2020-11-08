import { EditIcon } from '@tinacms/icons'
import { StyleReset, Button } from '@tinacms/styles'
import { LoadingDots } from '@tinacms/react-forms'
import { useCallback, useState } from 'react'
import {
  useCMS,
  Modal,
  ModalPopup,
  ModalHeader,
  ModalBody,
  ModalActions,
} from 'tinacms'
import { isLoggedIn, generateCodes, startLogin } from '../services/github/login'

import styles from '../styles/EditButton.module.css'


export const EditButton = () => {
  const cms = useCMS()

  const [code, setCode] = useState<string>()
  const [busy, setBusy] = useState(false)

  const cancel = useCallback(() => {
    setCode(undefined)
    cms.disable()
  }, [setCode])

  const startEditing = useCallback(async () => {
    cms.enable()
    if (!await isLoggedIn()) {
      const { user_code } = await generateCodes()
      setCode(user_code)
    }
  }, [cms])

  const openWindow = useCallback(async () => {
    setBusy(true)
    try {
      await startLogin()
      setCode('')
    } catch {
      setBusy(false)
      cms.disable()
    }
  }, [cms, setBusy])

  if (code) {
    return (
      <StyleReset>
        <Modal>
          <ModalPopup>
            <ModalHeader close={cancel}>
              Authorization required
            </ModalHeader>
            <ModalBody padded>
              <p>Copy the code and click on the login button.</p>
              <pre className={styles.userCode}>
                {code}
              </pre>
            </ModalBody>
            <ModalActions>
              <Button
                primary={true}
                onClick={openWindow}
                busy={busy}
                disabled={busy}
              >
                {busy && <LoadingDots />}
                {!busy && 'Login'}
              </Button>
            </ModalActions>
          </ModalPopup>
        </Modal>
      </StyleReset>
    ) 
  }
  if (cms.disabled) {
    return (
      <div className={styles.editButton} onClick={startEditing}>
        <EditIcon />
      </div>
    )
  }
  return <></>
}