import { RequestHandler } from 'express'
import firebaseAdminSdkGetApp from './firebaseAdminSdkGetApp'
import { auth } from 'firebase-admin'
import databaseGetConnection from './databaseGetConnection'
import recordAt from './recordAt'

const userIdsByFirebaseUid: Record<string, number> = {}

const serverMiddlewareFirebaseAuthToken: RequestHandler = async (request, response, next) => {
  const firebase = firebaseAdminSdkGetApp()

  const authorizationHeader = request.header('Authorization')

  if (!authorizationHeader) {
    response.status(401).json({ messate: 'Unauthorized' })
    return
  }

  const idToken = authorizationHeader.split('Bearer ')[1]


  auth(firebase)
    .verifyIdToken(idToken)
    .then((decodedIdToken) => {
      const inCache = recordAt(userIdsByFirebaseUid, decodedIdToken.uid)

      if (inCache) {
        return inCache
      }

      const db = databaseGetConnection()
      return db.transaction(async (trx) => {
        const user = await trx('users')
          .first('id')
          .where('firebaseUid', decodedIdToken.uid)

        if (user) {
          userIdsByFirebaseUid[decodedIdToken.uid] = user.id
          return user.id
        }

        const [newUserId] = await trx('users').insert({
          firebaseUid: decodedIdToken.uid,
        })

        userIdsByFirebaseUid[decodedIdToken.uid] = newUserId
        return newUserId
      })
    })
    .then((userId: number) => {
      response.locals.userId = userId
      next()
    })
    .catch(() => {
      response.status(401).json({ messate: 'Unauthorized' })
    })
}

export default serverMiddlewareFirebaseAuthToken
