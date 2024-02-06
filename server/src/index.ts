import express from 'express'
import 'dotenv/config'
import unknownGetAsNumber from './shared/unknownGetAsNumber'
import firebaseAdminSdkGetApp from './shared/firebaseAdminSdkGetApp'

const app = express()
const port = unknownGetAsNumber(process.env.PORT)

app.use((request, response, next) => {
  const allowedOrigins = `${process.env.ALLOWED_ORIGIN_HOSTS}`
  response.setHeader('Access-Control-Allow-Origin', allowedOrigins)
  next()
})

const v1MyRouter = express.Router()

v1MyRouter.use((request, response, next) => {
  const firebaseAdminSdk = firebaseAdminSdkGetApp()
  console.log(firebaseAdminSdk)
  next()
})

v1MyRouter.get('/workspaces', (request, response) => {
  response.send([])
})

app.use('/v1/my', v1MyRouter)

app.get('*', (request, response) => {
  response.status(404).send('Not found')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
