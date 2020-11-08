import Link from 'next/link'
import SanitizedHTML from 'react-sanitized-html'
import { InlineText } from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'

import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import { GetStaticProps } from 'next'
import { parsePage, getPages } from '../services/github/static'
import { InlineForm } from '../components/InlineForm'

export default function Home(props) {
  const posts = props.posts
  return (
    <InlineForm id="home" data={props}>
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
            <SanitizedHTML html={props.body} />
          </InlineWysiwyg>
        </div>
        <ul className={styles.list}>
          {posts.map((post, index) => 
            <li key={index}>
              <Link href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          )}
        </ul>
      </main>

      <footer className={styles.footer}>
        Powered by&nbsp; <b>joaogsleite</b>
      </footer>
    </div>
    </InlineForm>
  )
}

export const getStaticProps: GetStaticProps = async function() {
  const props = await parsePage('home')
  const posts = await getPages('posts')
  props.posts = await Promise.all(posts.map(async (slug) => {
    const post = await parsePage('posts', slug)
    return {
      slug,
      ...post,
    }
  }))
  return { props }
}