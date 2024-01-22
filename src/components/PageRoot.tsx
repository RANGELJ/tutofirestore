/* eslint-disable react-refresh/only-export-components */
import { redirect } from 'react-router-dom'
import firebaseGetCurrentUser from '../shared/firebaseGetCurrentUser'
import routerGetPaths from '../shared/routerGetPaths'
import localStorageGetFirebaseEmailWaitingToBeVerified from '../shared/localStorageGetFirebaseEmailWaitingToBeVerified'

export const loader = async () => {
  const user = await firebaseGetCurrentUser()

  if (user) {
    return null
  }

  const firebaseEmailWaitingToBeVerified = localStorageGetFirebaseEmailWaitingToBeVerified()

  if (firebaseEmailWaitingToBeVerified) {
    return redirect(routerGetPaths().authWaitingEmailVerificationLink)
  }

  return redirect(routerGetPaths().auth)
}

export const Component = () => null
