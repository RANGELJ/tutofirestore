import { RequestHandler } from 'express';
import firebaseAdminSdkGetApp from './firebaseAdminSdkGetApp'
import { auth } from 'firebase-admin';

const firebaseAuthMiddleware: RequestHandler = async (request, response, next) => {
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
}

export default firebaseAuthMiddleware
