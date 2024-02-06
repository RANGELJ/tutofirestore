import express from 'express'
import 'dotenv/config'
import unknownGetAsNumber from './shared/unknownGetAsNumber'
import fs from 'fs/promises'
import path from 'path'
import myRouter from './routers/v1/my'

const app = express()
const port = unknownGetAsNumber(process.env.PORT)

app.use((request, response, next) => {
  const allowedOrigins = `${process.env.ALLOWED_ORIGIN_HOSTS}`
  response.setHeader('Access-Control-Allow-Origin', allowedOrigins)

  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    response.setHeader('Access-Control-Allow-Headers', 'Authorization')
    response.status(204).send()
    return
  }

  next()
})

app.use('/v1/my', myRouter)

app.get('*', (request, response) => {
  response.status(404).send('Not found')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
