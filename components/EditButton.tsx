import { useCallback, useState } from 'react'
import { useCMS } from 'tinacms'
import { isLoggedIn, generateCodes, startLogin } from '../services/github/login'
import { Modal } from './Modal'

import styles from '../styles/EditButton.module.css'


export const EditButton = () => {
  const cms = useCMS()

  const [code, setCode] = useState<string>()

  const cancel = useCallback(() => {
    setCode(undefined)
  }, [setCode])

  const startEditing = useCallback(async () => {
    if (!await isLoggedIn()) {
      const { user_code } = await generateCodes()
      setCode(user_code)
    } else {
      cms.enable()
    }
  }, [cms])

  const openWindow = useCallback(async () => {
    await startLogin()
    cms.enable()
  }, [cms])
  
  if (cms.disabled) {
    if (code) {
      return (
        <Modal onClose={cancel}>
          <div className={styles.loginModal}>
            <h1>Authorization required</h1>
            <p>Copy the code and click on the login button:</p>
            <pre>{code}</pre>
            <button onClick={openWindow}>
              Login
            </button>
          </div>
        </Modal>
      )
    } else {
      return (
        <button className={styles.editButton} onClick={startEditing}></button>
      )
    }
  }
  return <></>
}