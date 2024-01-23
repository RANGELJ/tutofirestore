/* eslint-disable react-refresh/only-export-components */
import AuthForm from '../components/AuthForm'
import { ActionFunction, LoaderFunction, isRouteErrorResponse, redirect, useNavigation, useRouteError } from 'react-router-dom'
import localStorageGetFirebaseEmailWaitingToBeVerified from '../shared/localStorageGetFirebaseEmailWaitingToBeVerified'
import routerGetPaths from '../shared/routerGetPaths'
import { sendSignInLinkToEmail } from 'firebase/auth'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import RouteForm from './RouteForm'
import localStorageSetFirebaseEmailWaitingToBeVerified from '../shared/localStorageSetFirebaseEmailWaitingToBeVerified'

export const loader: LoaderFunction = async () => {
  const firebaseEmailWaitingVerification = localStorageGetFirebaseEmailWaitingToBeVerified()
  console.log('firebaseEmailWaitingVerification', firebaseEmailWaitingVerification)

  if (firebaseEmailWaitingVerification) {
    return redirect(routerGetPaths().root)
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
    url: `${window.location.protocol}//${window.location.host}/${routerGetPaths().auth}`,
    handleCodeInApp: true,
  })

  localStorageSetFirebaseEmailWaitingToBeVerified(email)

  return redirect(routerGetPaths().auth)
}

export const Component = () => {
  const submitting = useNavigation().state === 'submitting'

  return (
    <RouteForm method="POST">
      <AuthForm
        severity="info"
        title="Welcome"
        instructions="Please enter your email adress and then click on the button so we can send you a verification email."
        actionIsDisabled={submitting}
        actionnName="Send verification email"
        initialEmailAddress=""
        inputIsDisabled={submitting}
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
    <RouteForm method="GET" resource={routerGetPaths().auth}>
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
