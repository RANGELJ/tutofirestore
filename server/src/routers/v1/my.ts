import express from 'express'
import firebaseAuthMiddleware from '../../shared/firebaseAuthMiddleware'
import databaseGetConnection from '../../shared/databaseGetConnection'
import valueIsNotEmptyString from '../../shared/valueIsNotEmptyString'
import serverCreateClientInputError from '../../shared/serverCreateClientInputError'
import serverWrapHandler from '../../shared/serverWrapHandler'

const router = express.Router()

router.use(firebaseAuthMiddleware)

router.get('/workspaces', serverWrapHandler(async (request) => {
  const firebaseUid = request.headers.uid

  if (valueIsNotEmptyString(firebaseUid)) {
    throw serverCreateClientInputError('firebaseUid is required')
  }

  /*
  const db = databaseGetConnection()

  const userInDb = await db('users')
    .first('id')
    .where('firebaseUid', firebaseUid)

  console.log('userInDb', userInDb)
  */

  return []
}))

export default router
