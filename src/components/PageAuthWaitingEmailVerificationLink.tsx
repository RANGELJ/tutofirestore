/* eslint-disable react-refresh/only-export-components */
import AuthForm from '../components/AuthForm'
import {
  type ActionFunction,
  redirect,
} from 'react-router-dom'
import localStorageGetFirebaseEmailWaitingToBeVerified from '../shared/localStorageGetFirebaseEmailWaitingToBeVerified'
import routerGetPaths from '../shared/routerGetPaths'
import localStorageRemoveFirebaseEmailWaitingToBeVerified from '../shared/localStorageRemoveFirebaseEmailWaitingToBeVerified'
import RouteForm from './RouteForm'
import useNavigationIsSubmitting from '../hooks/useNavigationIsSubmitting'
import pageLoaderEnsureNotAuthenticated from '../shared/pageLoaderEnsureNotAuthenticated'
import usePageLoaderData from '../hooks/usePageLoaderData'

export const loader = async () => {
  pageLoaderEnsureNotAuthenticated()

  const firebaseEmailWaitingVerification = localStorageGetFirebaseEmailWaitingToBeVerified()

  if (!firebaseEmailWaitingVerification) {
    throw redirect(routerGetPaths().auth)
  }

  return firebaseEmailWaitingVerification
}

export const action: ActionFunction = async () => {
  localStorageRemoveFirebaseEmailWaitingToBeVerified()
  return redirect(routerGetPaths().auth)
}

export const Component = () => {
  const firebaseEmailWaiting = usePageLoaderData<typeof loader>()

  const isSubmitting = useNavigationIsSubmitting()

  return (
    <RouteForm method="POST">
      <AuthForm
        severity="info"
        actionnName="Reset"
        title="Waiting for email verification"
        initialEmailAddress={firebaseEmailWaiting}
        instructions="Please check your invoice"
        actionIsDisabled={isSubmitting}
        inputIsDisabled
      />
    </RouteForm>
  )
}
