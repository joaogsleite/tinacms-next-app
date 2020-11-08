import {useEffect } from 'react'
import { FormOptions } from '@tinacms/forms'
import { usePlugin, useForm as useTinaForm, useCMS } from 'tinacms'
import { fetchPage, savePage } from '../services/github'

export function useForm<T> (formConfig: Partial<FormOptions<T>>) {
  
  const cms = useCMS()
  
  const config: Partial<FormOptions<T>> = {
    ...formConfig,
    onSubmit: async (data) => {
      await savePage(form.id, data)
    }
  }
  const [data, form] = useTinaForm(config as FormOptions<T>)

  usePlugin(form)

  useEffect(() => {
    if(cms.enabled) {
      fetchPage(config.id).then((data) => {
        form.updateValues(data)
        form.updateInitialValues(data)
      })
    }
  }, [cms.enabled])

  return [data, form]
}