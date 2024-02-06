import express from 'express'
import 'dotenv/config'
import unknownGetAsNumber from './shared/unknownGetAsNumber'
import firebaseAdminSdkGetApp from './shared/firebaseAdminSdkGetApp'
import { auth } from 'firebase-admin'

const app = express()
const port = unknownGetAsNumber(process.env.PORT)

app.use((request, response, next) => {
  console.log('Preflight request', request.method)

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

const v1MyRouter = express.Router()

v1MyRouter.use(async (request, response, next) => {
  const firebase = firebaseAdminSdkGetApp()

  const authorizationHeader = request.header('Authorization')

  if (!authorizationHeader) {
    response.status(401).send('Unauthorized')
    return
  }

  const idToken = authorizationHeader.split('Bearer ')[1]

  const decodedIdToken = await auth(firebase).verifyIdToken(idToken)

  request.headers.uid = decodedIdToken.uid

  next()
})

v1MyRouter.get('/workspaces', (request, response) => {
  console.log(request.headers.uid)
  response.send([])
})

app.use('/v1/my', v1MyRouter)

app.get('*', (request, response) => {
  response.status(404).send('Not found')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
