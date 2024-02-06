import express from 'express'
import firebaseAuthMiddleware from '../../shared/firebaseAuthMiddleware'

const router = express.Router()

router.use(firebaseAuthMiddleware)

router.get('/workspaces', (request, response) => {
  console.log(request.headers.uid)
  response.send([])
})

export default router
