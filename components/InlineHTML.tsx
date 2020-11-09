import SanitizedHTML from 'react-sanitized-html'
import { useCMS } from 'tinacms'
import { useEffect, useState } from 'react'

export const InlineHTML = ({ name, data }) => {

  const cms = useCMS()

  const [{ InlineWysiwyg }, setEditor] = useState<any>({})

  useEffect(() => {
    if (!InlineWysiwyg && cms.enabled) {
      import('react-tinacms-editor').then(setEditor)
    }
  }, [cms.enabled])
  
  if (InlineWysiwyg) {
    return (
      <InlineWysiwyg name={name} format="html" sticky="70px">
        <SanitizedHTML html={data[name]} />
      </InlineWysiwyg>
    )
  } else {
    return <SanitizedHTML html={data[name]} />
  }
}