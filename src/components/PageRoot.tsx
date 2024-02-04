/* eslint-disable react-refresh/only-export-components */
import { redirect } from 'react-router-dom'
import firebaseGetCurrentUser from '../shared/firebaseGetCurrentUser'
import routerGetPaths from '../shared/routerGetPaths'

export const loader = async () => {
  const user = await firebaseGetCurrentUser()

  if (user) {
    return null
  }

  throw redirect(routerGetPaths().auth)
}

export const Component = () => null
