/* eslint-disable react-refresh/only-export-components */
import AuthForm from './AuthForm'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import RouteForm from './RouteForm'
import useNavigationIsSubmitting from '../hooks/useNavigationIsSubmitting'
import routerGetPath from '../shared/routerGetPath'
import localStorageGetFirebaseEmailWaitingToBeVerified from '../shared/localStorageGetFirebaseEmailWaitingToBeVerified'
import routerCreateRedirectResponse from '../shared/routerCreateRedirectResponse'

export const loader = () => {
  const firebaseEmailWaitingVerification = localStorageGetFirebaseEmailWaitingToBeVerified()

  if (firebaseEmailWaitingVerification) {
      throw routerCreateRedirectResponse('nouser/waitingEmailVerificationLink')
  }
  return null
}

export const Component = () => {
  const isSubmitting = useNavigationIsSubmitting()

  return (
    <RouteForm method="POST">
      <AuthForm
        severity="info"
        title="Welcome"
        instructions="Please enter your email adress and then click on the button so we can send you a verification email."
        actionIsDisabled={isSubmitting}
        actionnName="Send verification email"
        initialEmailAddress=""
        inputIsDisabled={isSubmitting}
      />
    </RouteForm>
  )
}

export const ErrorBoundary = () => {
  const error = useRouteError()

  const message = isRouteErrorResponse(error)
    ? `${error.data}`
    : 'An unexpected error occurred'

  return (
    <RouteForm method="GET" resource={routerGetPath('nouser')}>
      <AuthForm
        severity="error"
        title="Welcome"
        instructions={message}
        actionIsDisabled={false}
        actionnName="Retry"
        initialEmailAddress=""
        inputIsDisabled={true}
      />
    </RouteForm>
  )
}
