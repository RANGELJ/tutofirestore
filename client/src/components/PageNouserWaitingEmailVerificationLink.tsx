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
import useFirebaseCurrentUser from '../hooks/useFirebaseCurrentUser'

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
  const currentUser = useFirebaseCurrentUser()
  const firebaseEmailWaiting = usePageLoaderData<typeof loader>()

  const isSubmitting = useNavigationIsSubmitting()

  if (currentUser) {
    return (
      <AuthForm
        severity="success"
        actionnName="..."
        title="Email verified on other tab!"
        initialEmailAddress={firebaseEmailWaiting}
        instructions="You can close this tab and continue on the other one."
        actionIsDisabled
        inputIsDisabled
      />
    )
  }

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
