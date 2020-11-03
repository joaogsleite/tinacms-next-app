const http = require('http')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const nextHandler = app.getRequestHandler()

app.prepare().then(() => {
  http.createServer((req, res) => {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      })
      return res.end()
    } else {
      return nextHandler(req, res)
    }
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('Ready on http://localhost:3000')
  })
})