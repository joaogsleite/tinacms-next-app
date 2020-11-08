import queryString from 'query-string'
import SanitizedHTML from 'react-sanitized-html'
import { InlineText } from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'

import Head from 'next/head'
import styles from '../../styles/Home.module.scss'

import { GetStaticProps } from 'next'
import { InlineForm } from '../../components/InlineForm'
import { useEffect, useState } from 'react'
import { useCMS } from 'tinacms'

export const PostCreatorPlugin = {
  __type: 'content-creator',
  name: 'Blog post',
  fields: [
    {
      label: 'Slug',
      name: 'slug',
      component: 'text',
      validation(value) {
        if (!value) return "Required."
      }
    },
  ],
  onSubmit(values) {
    location.replace(`/posts/new?slug=${values.slug}`);
  }
}


export default function Post(props) {
  const slug = process.browser && 
      queryString.parse(window.location.search).slug
  const cms = useCMS()
  useEffect(() => {
    cms.enable()
  }, [])
  const defaultData = {
    title: slug
  }
  return (
    <InlineForm id={`posts/${slug}`} data={props} defaultData={defaultData}>
    <div className={styles.container}>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <main className={styles.main}>
        <h1 className={styles.title}>
          <InlineText name="title" />
        </h1>
        <div className={styles.body}>
          <InlineWysiwyg name="body" format="html">
            <SanitizedHTML html={props.body} />
          </InlineWysiwyg>
        </div>
      </main>

      <footer className={styles.footer}>
        Powered by&nbsp; <b>joaogsleite</b>
      </footer>
    </div>
    </InlineForm>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const props = {
    cmsEnabled: true,
    body: 'Replace this text...'
  }
  return {  props }
}