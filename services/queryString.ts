import queryString from 'query-string'

export default function QueryString() {
  return queryString.parse(window.location.search) || {}
}