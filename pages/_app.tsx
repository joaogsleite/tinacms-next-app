import { TinaCMS, TinaProvider } from 'tinacms'
import { GithubClient, TinacmsGithubProvider, GithubMediaStore } from 'react-tinacms-github'
import { EditLink } from '../components/EditLink'
import '../styles/globals.css'

const github = new GithubClient({
  proxy: `${process.env.API_BASE_URL}/api/proxy-github`,
  authCallbackRoute: `${process.env.API_BASE_URL}/api/create-github-access-token`,
  clientId: process.env.GITHUB_CLIENT_ID,
  baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
  baseBranch: process.env.BASE_BRANCH, // e.g. 'master' or 'main' on newer repos
  authScope: 'repo' // normally defaults to 'public_repo'
})

export default function MyApp({ Component, pageProps }) {
  const cms = new TinaCMS({
    enabled: !!pageProps.preview,
    apis: {
      github,
    },
    media: new GithubMediaStore(github),
    sidebar: pageProps.preview,
    toolbar: pageProps.preview,
  })
  return (
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider
        onLogin={onLogin}
        onLogout={onLogout}
        error={pageProps.error}
      >
        <EditLink cms={cms} />
        <Component {...pageProps} />
      </TinacmsGithubProvider>
    </TinaProvider>
  )
}

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null
  const headers = new Headers()
  if (token) {
    headers.append('Authorization', 'Bearer ' + token)
  }
  const resp = await fetch(`${process.env.API_BASE_URL}/api/preview`, { headers: headers })
  const data = await resp.json()
  if (resp.status == 200) {
    window.location.href = window.location.pathname
  } else {
    throw new Error(data.message)
  }
}

const onLogout = () => {
  return fetch(`${process.env.API_BASE_URL}/api/reset-preview`).then(() => {
    window.location.reload()
  })
}

