/* eslint-disable react-refresh/only-export-components */
import AuthForm from '../components/AuthForm'
import { ActionFunction, LoaderFunction, redirect, useRouteError } from 'react-router-dom'
import localStorageGetFirebaseEmailWaitingToBeVerified from '../shared/localStorageGetFirebaseEmailWaitingToBeVerified'
import routerGetPaths from '../shared/routerGetPaths'
import { sendSignInLinkToEmail } from 'firebase/auth'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import RouteForm from './RouteForm'

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
  const email = formData.get('email')

  if (!email) {
    throw new Error('No email provided')
  }

  await sendSignInLinkToEmail(firebaseGetAuth(), 'hehehehe', {
    url: `${window.location.protocol}//${window.location.host}/${routerGetPaths().auth}`,
    handleCodeInApp: true,
  })

  return redirect(routerGetPaths().auth)
}

export const Component = () => (
  <RouteForm method="POST">
    <AuthForm
      severity="info"
      title="Welcome"
      instructions="Please enter your email adress and then click on the button so we can send you a verification email."
      actionIsDisabled={false}
      actionnName="Send verification email"
      initialEmailAddress=""
      inputIsDisabled={false}
    />
  </RouteForm>
)

export const ErrorBoundary = () => {
  const error = useRouteError()

  return (
    <RouteForm method="GET" resource={routerGetPaths().auth}>
      <AuthForm
        severity="error"
        title="Welcome"
        instructions={`${error}`}
        actionIsDisabled={false}
        actionnName="Retry"
        initialEmailAddress=""
        inputIsDisabled={true}
      />
    </RouteForm>
  )
}
