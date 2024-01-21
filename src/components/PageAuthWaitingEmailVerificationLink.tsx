/* eslint-disable react-refresh/only-export-components */
import AuthForm from '../components/AuthForm'
import {
    type ActionFunction,
    Form,
    redirect,
    useLoaderData,
} from 'react-router-dom'
import localStorageGetFirebaseEmailWaitingToBeVerified from '../shared/localStorageGetFirebaseEmailWaitingToBeVerified'
import routerGetPaths from '../shared/routerGetPaths'

type LoaderData = string

export const loader = async (): Promise<LoaderData | Response> => {
  const firebaseEmailWaitingVerification = localStorageGetFirebaseEmailWaitingToBeVerified()
  if (!firebaseEmailWaitingVerification) {
    return redirect(routerGetPaths().auth)
  }
  return firebaseEmailWaitingVerification
}

export const action: ActionFunction = async () => {
    console.log('action matched')
    return redirect(routerGetPaths().auth)
}

export const Component = () => {
  const firebaseEmailWaiting = useLoaderData() as LoaderData

  return (
    <Form method="POST">
      <AuthForm
        actionnName="Reset"
        title="Waiting for email verification"
        autoFocus={false}
        initialEmailAddress={firebaseEmailWaiting}
        instructions="Please check your invoice"
        actionIsDisabled={false}
        inputIsDisabled
      />
    </Form>
  )
}
