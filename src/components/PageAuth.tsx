/* eslint-disable react-refresh/only-export-components */
import AuthForm from '../components/AuthForm'
import { ActionFunction, Form, redirect, useLoaderData } from 'react-router-dom'
import localStorageGetFirebaseEmailWaitingToBeVerified from '../shared/localStorageGetFirebaseEmailWaitingToBeVerified'
import routerGetPaths from '../shared/routerGetPaths'
import { sendSignInLinkToEmail } from 'firebase/auth'
import firebaseGetAuth from '../shared/firebaseGetAuth'

type LoaderData = string | null

export const loader = async (): Promise<LoaderData> => {
  const firebaseEmailWaitingVerification = localStorageGetFirebaseEmailWaitingToBeVerified()
  return firebaseEmailWaitingVerification
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email')

  if (!email) {
    throw new Error('No email')
  }

  await sendSignInLinkToEmail(firebaseGetAuth(), 'hehehehe', {
    url: `${window.location.protocol}//${window.location.host}/auth`,
    handleCodeInApp: true,
  })

  return redirect(routerGetPaths().auth)
}

export const Component = () => {
  const firebaseEmailWaiting = useLoaderData() as LoaderData

  return (
    <Form method="POST">
      <AuthForm
        title="Welcome"
        autoFocus={!firebaseEmailWaiting}
        instructions="Please enter your email adress and then click on the button to send a verification email"
        actionIsDisabled={false}
        actionnName="Send verification email"
        initialEmailAddress=""
        inputIsDisabled={false}
      />
    </Form>
  )
}
