import {useEffect, useState } from 'react'
import { FormOptions } from '@tinacms/forms'
import { usePlugin, useForm as useTinaForm, useCMS } from 'tinacms'
import { fetchPage, savePage } from '../services/content'

export function useForm<T> (id: string, initialValues: any, defaultData: any = {}) {
  
  const cms = useCMS()
  
  const config: Partial<FormOptions<T>> = {
    id,
    initialValues,
    onSubmit: async (data) => {
      await savePage(form.id, data)
    }
  }
  const [_, form] = useTinaForm(config as FormOptions<T>)

  usePlugin(form)

  useEffect(() => {
    form.id = id
    if(cms.enabled) {
      fetchPage(config.id).then((data = {}) => {
        form.updateValues(data)
        form.updateInitialValues(data)
      })
    }
  }, [cms.enabled, form.id])

  return form
}