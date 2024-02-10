import express from 'express'
import firebaseAuthMiddleware from '../../shared/firebaseAuthMiddleware'
import databaseGetConnection from '../../shared/databaseGetConnection'

const router = express.Router()

router.use(firebaseAuthMiddleware)

router.get('/workspaces', async (request, response) => {
  console.log(request.headers.uid)
  const db = databaseGetConnection()
  const workspaces = await db('workspaces')
    .select('id')
    .where('owner', request.headers.uid)
  response.json(workspaces)
})

export default router
