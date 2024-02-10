import express from 'express'
import serverMiddlewareFirebaseAuthToken from '../../shared/serverMiddlewareFirebaseAuthToken'
import serverWrapHandler from '../../shared/serverWrapHandler'
import serverResponseGetUserId from '../../shared/serverResponseGetUserId'
import databaseGetConnection from '../../shared/databaseGetConnection'

const router = express.Router()

router.use(serverMiddlewareFirebaseAuthToken)

router.get('/workspaces', serverWrapHandler(async (request, response) => {
  const userId = serverResponseGetUserId(response)
  const db = databaseGetConnection()

  const workspaces = await db('workspaces')
    .select('id', 'name')
    .where('userId', userId)

  return workspaces
}))

export default router
