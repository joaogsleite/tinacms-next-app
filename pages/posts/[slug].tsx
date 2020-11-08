import queryString from 'query-string'
import Router from 'next/router'
import SanitizedHTML from 'react-sanitized-html'
import { InlineText } from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'

import Head from 'next/head'
import styles from '../../styles/Home.module.scss'

import { GetStaticProps } from 'next'
import { getPages, parsePage } from '../../services/github/static'
import { InlineForm } from '../../components/InlineForm'

export default function Post(props) {
  return (
    <InlineForm id={`posts/${props.slug}`} data={props}>
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
  const props = await parsePage('posts', params.slug as string)
  props.slug = params.slug
  return { props }
}

export async function getStaticPaths() {
  const pages = await getPages('posts')
  return { 
    paths: pages.map((slug) => ({ params: { slug }})),
    fallback: false
  }
}