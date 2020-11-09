import Link from 'next/link'
import { InlineText } from 'react-tinacms-inline'

import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import { GetStaticProps } from 'next'
import { InlineForm } from '../components/InlineForm'
import { InlineHTML } from '../components/InlineHTML'
import * as contentService from '../services/content'

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
          <InlineHTML name="body" data={props} />
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
  const props = await contentService.fetchPage('home')
  const posts = await contentService.getPages('posts')
  props.posts = await Promise.all(posts.map(async (slug) => {
    const post = await contentService.fetchPage(`posts/${slug}`)
    return {
      slug,
      ...post,
    }
  }))
  return { props }
}