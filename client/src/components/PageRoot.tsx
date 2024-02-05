/* eslint-disable react-refresh/only-export-components */
import { signOut } from 'firebase/auth'
import firebaseGetCurrentUser from '../shared/firebaseGetCurrentUser'
import routerCreateRedirectResponse from '../shared/routerCreateRedirectResponse'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import useFirebaseCurrentUser from '../hooks/useFirebaseCurrentUser'
import { Navigate } from 'react-router-dom'
import routerGetPath from '../shared/routerGetPath'

export const loader = async () => {
  const user = await firebaseGetCurrentUser()

  if (!user) {
    throw routerCreateRedirectResponse('nouser')
  }

  const response = await fetch(`${import.meta.env.VITE_SERVER_HOST}/v1/my/workspaces`)
  const data = await response.json()

  console.log(data)

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
