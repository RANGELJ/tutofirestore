/* eslint-disable react-refresh/only-export-components */
import AuthForm from './AuthForm'
import {
  type ActionFunction,
} from 'react-router-dom'
import localStorageGetFirebaseEmailWaitingToBeVerified from '../shared/localStorageGetFirebaseEmailWaitingToBeVerified'
import localStorageRemoveFirebaseEmailWaitingToBeVerified from '../shared/localStorageRemoveFirebaseEmailWaitingToBeVerified'
import RouteForm from './RouteForm'
import useNavigationIsSubmitting from '../hooks/useNavigationIsSubmitting'
import usePageLoaderData from '../hooks/usePageLoaderData'
import routerCreateRedirectResponse from '../shared/routerCreateRedirectResponse'

export const loader = async () => {
  const firebaseEmailWaitingVerification = localStorageGetFirebaseEmailWaitingToBeVerified()

  if (!firebaseEmailWaitingVerification) {
    throw routerCreateRedirectResponse('nouser')
  }

  return firebaseEmailWaitingVerification
}

export const action: ActionFunction = async () => {
  localStorageRemoveFirebaseEmailWaitingToBeVerified()
  return routerCreateRedirectResponse('nouser')
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
        instructions="Please check your invoice, you can close this tab"
        actionIsDisabled={isSubmitting}
        inputIsDisabled
      />
    </RouteForm>
  )
}
