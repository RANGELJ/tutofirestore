import express from 'express'
import serverMiddlewareFirebaseAuthToken from '../../shared/serverMiddlewareFirebaseAuthToken'
import databaseGetConnection from '../../shared/databaseGetConnection'
import valueIsNotEmptyString from '../../shared/valueIsNotEmptyString'
import serverCreateClientInputError from '../../shared/serverCreateClientInputError'
import serverWrapHandler from '../../shared/serverWrapHandler'

const router = express.Router()

router.use(serverMiddlewareFirebaseAuthToken)

router.get('/workspaces', serverWrapHandler(async (request) => {
  return []
}))

export default router
