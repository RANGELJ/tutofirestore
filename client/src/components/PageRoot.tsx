/* eslint-disable react-refresh/only-export-components */
import { signOut } from 'firebase/auth'
import valueIsNotEmptyString from 'shared/valueIsNotEmptyString'
import valueIsClientInputError from 'shared/valueIsClientInputError'
import routerCreateRedirectResponse from '../shared/routerCreateRedirectResponse'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import { Outlet, useRouteError } from 'react-router-dom'
import serverFetchWorkspaces from '../shared/serverFetchWorkspaces'
import routerLoaderEnsuredFirebaseUser from '../shared/routerLoaderEnsuredFirebaseUser'

export const loader = async () => {
  console.log('PageRoot loader')
  await routerLoaderEnsuredFirebaseUser()

  const workspaces = await serverFetchWorkspaces()

  if (workspaces.length === 0) {
    throw routerCreateRedirectResponse('workspaces/first')
  }

  return workspaces
}

export const Component = () => (
  <>
    <button onClick={() => signOut(firebaseGetAuth())}>Clear</button>
    <Outlet />
  </>
)

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
    return (
      <div>
        <code>{`${routeError}`}</code>
      </div>
    )
  }

  return <div>{error.message}</div>
}
