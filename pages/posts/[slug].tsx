import { InlineText } from 'react-tinacms-inline'

import Head from 'next/head'
import styles from '../../styles/Home.module.scss'

import { GetStaticProps } from 'next'
import * as contentService from '../../services/content'
import { InlineForm } from '../../components/InlineForm'
import { InlineHTML } from '../../components/InlineHTML'

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const props = await contentService.fetchPage(`posts/${params.slug}`)
  props.slug = params.slug
  return { props }
}

export async function getStaticPaths() {
  const pages = await contentService.getPages('posts')
  return { 
    paths: pages.map((slug) => ({ params: { slug }})),
    fallback: false
  }
}