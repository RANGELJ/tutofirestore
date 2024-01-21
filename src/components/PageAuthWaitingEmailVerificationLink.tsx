/* eslint-disable react-refresh/only-export-components */
import AuthForm from '../components/AuthForm'
import {
  type ActionFunction,
  redirect,
  useLoaderData,
} from 'react-router-dom'
import localStorageGetFirebaseEmailWaitingToBeVerified from '../shared/localStorageGetFirebaseEmailWaitingToBeVerified'
import routerGetPaths from '../shared/routerGetPaths'
import localStorageRemoveFirebaseEmailWaitingToBeVerified from '../shared/localStorageRemoveFirebaseEmailWaitingToBeVerified'
import RouteForm from './RouteForm'

type LoaderData = string

export const loader = async (): Promise<LoaderData | Response> => {
  const firebaseEmailWaitingVerification = localStorageGetFirebaseEmailWaitingToBeVerified()
  if (!firebaseEmailWaitingVerification) {
    return redirect(routerGetPaths().auth)
  }
  return firebaseEmailWaitingVerification
}

export const action: ActionFunction = async () => {
  localStorageRemoveFirebaseEmailWaitingToBeVerified()
  return redirect(routerGetPaths().auth)
}

export const Component = () => {
  const firebaseEmailWaiting = useLoaderData() as LoaderData

  return (
    <RouteForm method="POST">
      <AuthForm
        actionnName="Reset"
        title="Waiting for email verification"
        autoFocus={false}
        initialEmailAddress={firebaseEmailWaiting}
        instructions="Please check your invoice"
        actionIsDisabled={false}
        inputIsDisabled
      />
    </RouteForm>
  )
}
