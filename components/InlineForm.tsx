import { FC, ReactElement } from 'react'
import { InlineForm as TinaInlineForm } from 'react-tinacms-inline'
import { useForm } from '../hooks/useForm'

export interface IProps{
  id: string
  data: any
  defaultData?: any
}

export const InlineForm: FC<IProps> = ({ id, data, defaultData, children }) => {
  const form = useForm(id, data, defaultData)
  return (
    <TinaInlineForm form={form}>
      {children as ReactElement}
    </TinaInlineForm>
  )
}
