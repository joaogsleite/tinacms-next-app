import QueryString from '../../services/queryString'
import { InlineText } from 'react-tinacms-inline'

import Head from 'next/head'
import styles from '../../styles/Home.module.scss'

import { GetStaticProps } from 'next'
import { InlineForm } from '../../components/InlineForm'
import { InlineHTML } from '../../components/InlineHTML'
import { slugify } from '../../services/content'
import { useEffect, useState } from 'react'

export const PostCreatorPlugin = {
  __type: 'content-creator',
  name: 'Blog post',
  fields: [
    {
      label: 'Title',
      name: 'title',
      component: 'text',
      validation(value) {
        if (!value) return "Required."
      }
    },
  ],
  onSubmit(values) {
    location.href = `/posts/new?title=${values.title}`
  }
}



export default function Post(props) {
  const [data, setData] = useState<any>({})
  useEffect(() => setData({ 
    ...props, 
    title: QueryString().title
  }), [setData])
  return (
    <InlineForm id={`posts/${slugify(data.title)}`} data={data}>
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
          <InlineHTML name="body" data={props} />
        </div>
      </main>

      <footer className={styles.footer}>
        Powered by&nbsp; <b>joaogsleite</b>
      </footer>
    </div>
    </InlineForm>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const props = {
    body: 'Replace this text...'
  }
  return {  props }
}