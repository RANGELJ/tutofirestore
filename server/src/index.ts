import express from 'express'
import 'dotenv/config'
import unknownGetAsNumber from './shared/unknownGetAsNumber'

const app = express()
const port = unknownGetAsNumber(process.env.PORT)

app.use((request, response, next) => {
  const allowedOrigins = `${process.env.ALLOWED_ORIGIN_HOSTS}`
  response.setHeader('Access-Control-Allow-Origin', allowedOrigins)
  next()
})

app.get('/v1/my/workspaces', (request, response) => {
  response.send([])
})

app.get('*', (request, response) => {
  response.status(404).send('Not found')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
