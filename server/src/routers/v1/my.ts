import express from 'express'
import serverMiddlewareFirebaseAuthToken from '../../shared/serverMiddlewareFirebaseAuthToken'
import serverWrapHandler from '../../shared/serverWrapHandler'
import serverResponseGetUserId from '../../shared/serverResponseGetUserId'
import databaseGetConnection from '../../shared/databaseGetConnection'
import serverCreateClientInputError from '../../shared/serverCreateClientInputError'

const router = express.Router()

router.use(serverMiddlewareFirebaseAuthToken)

router.get('/workspaces', serverWrapHandler(async (request, response) => {
  const userId = serverResponseGetUserId(response)
  const db = databaseGetConnection()

  const workspaces = await db('workspaces')
    .select('id', 'name')
    .where('userId', userId)

  if (workspaces) {
    throw serverCreateClientInputError('noWorkspaces')
  }

  return workspaces
}))

export default router
