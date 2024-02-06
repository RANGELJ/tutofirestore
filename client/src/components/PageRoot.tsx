/* eslint-disable react-refresh/only-export-components */
import { signOut } from 'firebase/auth'
import firebaseGetCurrentUser from '../shared/firebaseGetCurrentUser'
import routerCreateRedirectResponse from '../shared/routerCreateRedirectResponse'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import useFirebaseCurrentUser from '../hooks/useFirebaseCurrentUser'
import { Navigate } from 'react-router-dom'
import routerGetPath from '../shared/routerGetPath'
import serverRequest from '../shared/serverRequest'

export const loader = async () => {
  const user = await firebaseGetCurrentUser()

  if (!user) {
    throw routerCreateRedirectResponse('nouser')
  }

  await serverRequest()

  return null
}

export const Component = () => {
  const currentUser = useFirebaseCurrentUser()

  if (!currentUser) {
    return <Navigate to={routerGetPath('nouser')} replace />
  }

  return (
    <button onClick={() => signOut(firebaseGetAuth())}>Clear</button>
  )
}
