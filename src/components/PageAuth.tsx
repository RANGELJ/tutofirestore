/* eslint-disable react-refresh/only-export-components */
import AuthForm from '../components/AuthForm'
import { ActionFunction, LoaderFunction, redirect, useLoaderData, useRouteError } from 'react-router-dom'
import localStorageGetFirebaseEmailWaitingToBeVerified from '../shared/localStorageGetFirebaseEmailWaitingToBeVerified'
import routerGetPaths from '../shared/routerGetPaths'
import { sendSignInLinkToEmail } from 'firebase/auth'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import RouteForm from './RouteForm'

type LoaderData = string | null

export const loader: LoaderFunction = async () => {
  const firebaseEmailWaitingVerification = localStorageGetFirebaseEmailWaitingToBeVerified()
  console.log('firebaseEmailWaitingVerification', firebaseEmailWaitingVerification)

  if (firebaseEmailWaitingVerification) {
    return redirect(routerGetPaths().home)
  }

  return null
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email')

  if (!email) {
    throw new Error('No email')
  }

  await sendSignInLinkToEmail(firebaseGetAuth(), 'hehehehe', {
    url: `${window.location.protocol}//${window.location.host}/${routerGetPaths().auth}`,
    handleCodeInApp: true,
  })

  return redirect(routerGetPaths().auth)
}

export const Component = () => {
  const firebaseEmailWaiting = useLoaderData() as LoaderData

  return (
    <RouteForm method="POST">
      <AuthForm
        title="Welcome"
        autoFocus={!firebaseEmailWaiting}
        instructions="Please enter your email adress and then click on the button to send a verification email"
        actionIsDisabled={false}
        actionnName="Send verification email"
        initialEmailAddress=""
        inputIsDisabled={false}
      />
    </RouteForm>
  )
}

export const ErrorBoundary = () => {
  const error = useRouteError()

  console.log(error)

  return (
    <div>
      <h1>Something went wrong!!!</h1>
    </div>
  )
}
