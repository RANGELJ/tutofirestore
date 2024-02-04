/* eslint-disable react-refresh/only-export-components */
import AuthForm from '../components/AuthForm'
import { ActionFunction, isRouteErrorResponse, redirect, useRouteError } from 'react-router-dom'
import localStorageGetFirebaseEmailWaitingToBeVerified from '../shared/localStorageGetFirebaseEmailWaitingToBeVerified'
import routerGetPaths from '../shared/routerGetPaths'
import { sendSignInLinkToEmail } from 'firebase/auth'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import RouteForm from './RouteForm'
import localStorageSetFirebaseEmailWaitingToBeVerified from '../shared/localStorageSetFirebaseEmailWaitingToBeVerified'
import useNavigationIsSubmitting from '../hooks/useNavigationIsSubmitting'

export const loader = async () => {
  const firebaseEmailWaitingVerification = localStorageGetFirebaseEmailWaitingToBeVerified()

  if (firebaseEmailWaitingVerification) {
    throw redirect(routerGetPaths().authWaitingEmailVerificationLink)
  }

  return null
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const rawEmail = formData.get('email')

  if (!rawEmail) {
    throw new Response('Email is required', { status: 400 })
  }

  const email = rawEmail.toString()

  await sendSignInLinkToEmail(firebaseGetAuth(), email, {
    url: `${window.location.protocol}//${window.location.host}${routerGetPaths().authProcessingLink}`,
    handleCodeInApp: true,
  })

  localStorageSetFirebaseEmailWaitingToBeVerified(email)

  return redirect(routerGetPaths().nouser)
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
    <RouteForm method="GET" resource={routerGetPaths().nouser}>
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
