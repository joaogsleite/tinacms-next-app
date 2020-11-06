import { useCMS } from 'tinacms'

export const EditButton = () => {
  const cms = useCMS()
  return (
    <>
      {cms.disabled && (
        <button onClick={cms.enable}>
          Edit This Site
        </button>
      )}
    </>
  )
}