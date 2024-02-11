/* eslint-disable react-refresh/only-export-components */
import { signOut } from 'firebase/auth'
import valueIsNotEmptyString from 'shared/valueIsNotEmptyString'
import valueIsClientInputError from 'shared/valueIsClientInputError'
import firebaseGetCurrentUser from '../shared/firebaseGetCurrentUser'
import routerCreateRedirectResponse from '../shared/routerCreateRedirectResponse'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import useFirebaseCurrentUser from '../hooks/useFirebaseCurrentUser'
import { Navigate, useRouteError } from 'react-router-dom'
import routerGetPath from '../shared/routerGetPath'
import serverFetchWorkspaces from '../shared/serverFetchWorkspaces'

export const loader = async () => {
  const user = await firebaseGetCurrentUser()

  if (!user) {
    throw routerCreateRedirectResponse('nouser')
  }

  const workspaces = await serverFetchWorkspaces()

  console.log('workspaces', workspaces)

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

export const ErrorBoundary = () => {
  const routeError = useRouteError()

  const error = (() => {
    if (!valueIsNotEmptyString(routeError)) {
      return undefined
    } 

    try {
      const rawErrorObject = JSON.parse(routeError)

      if (!valueIsClientInputError(rawErrorObject)) {
        return undefined
      }

      return rawErrorObject
    } catch {
      return undefined
    }
  })()

  if (!error) {
    return <div>Server is down</div>
  }

  return <div>{error.message}</div>
}
