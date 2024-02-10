import { RequestHandler } from 'express';
import firebaseAdminSdkGetApp from './firebaseAdminSdkGetApp'
import { auth } from 'firebase-admin';

const firebaseAuthMiddleware: RequestHandler = async (request, response, next) => {
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
      request.headers.uid = decodedIdToken.uid
      next()
    })
    .catch(() => {
      response.status(401).json({ messate: 'Unauthorized' })
    })
}

export default firebaseAuthMiddleware
