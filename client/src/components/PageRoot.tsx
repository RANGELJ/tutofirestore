/* eslint-disable react-refresh/only-export-components */
import { signOut } from 'firebase/auth'
import valueIsRecord from 'shared/valueIsRecord'
import valueIsNotEmptyString from 'shared/valueIsNotEmptyString'
import valueIsClientInputError from 'shared/valueIsClientInputError'
import firebaseGetCurrentUser from '../shared/firebaseGetCurrentUser'
import routerCreateRedirectResponse from '../shared/routerCreateRedirectResponse'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import useFirebaseCurrentUser from '../hooks/useFirebaseCurrentUser'
import { Navigate, useRouteError } from 'react-router-dom'
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

export const ErrorBoundary = () => {
  const error = useRouteError()

  if (!valueIsRecord(error)) {
    return <div>Server is down</div>
  }

  const { message } = error

  if (!valueIsNotEmptyString(message)) {
    return <div>Server is down</div>
  }

  const serverError: unknown = JSON.parse(message)

  if (!valueIsClientInputError(serverError)) {
    return <div>Server is down</div>
  }

  return <div>{serverError.message}</div>
}
