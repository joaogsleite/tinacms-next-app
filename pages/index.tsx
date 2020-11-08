import SanitizedHTML from 'react-sanitized-html'
import { InlineForm, InlineText } from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'
import { useForm } from '../hooks/useForm'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { GetStaticProps } from 'next'
import { parsePage } from '../services/github/static'

export default function Home(props) {
  const formConfig = {
    id: 'home',
    label: 'Home Page',
    fields: [
      { name: 'title', component: 'text' }
    ],
    initialValues: props,
  }
  const [data, form] = useForm(formConfig)
  return (
    <InlineForm form={form}>
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <InlineText name="title" />
        </h1>
        <div className={styles.body}>
          <InlineWysiwyg name="body" format="html">
            <SanitizedHTML html={data.body} />
          </InlineWysiwyg>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by joaogsleite
        </a>
      </footer>
    </div>
    </InlineForm>
  )
}

export const getStaticProps: GetStaticProps = async function() {
  const data = await parsePage('home')
  return {
    props: {
      ...data,
    }
  }
}