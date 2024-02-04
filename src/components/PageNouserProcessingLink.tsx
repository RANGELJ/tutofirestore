/* eslint-disable react-refresh/only-export-components */
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import { Await, Navigate, defer } from 'react-router-dom'
import localStorageGetFirebaseEmailWaitingToBeVerified from '../shared/localStorageGetFirebaseEmailWaitingToBeVerified'
import usePageLoaderData from '../hooks/usePageLoaderData'
import AuthForm from './AuthForm'
import { Suspense } from 'react'
import RouteForm from './RouteForm'
import routerGetPath from '../shared/routerGetPath'
import routerCreateRedirectResponse from '../shared/routerCreateRedirectResponse'
import localStorageRemoveFirebaseEmailWaitingToBeVerified from '../shared/localStorageRemoveFirebaseEmailWaitingToBeVerified'

export const loader = async () => {
    const auth = firebaseGetAuth()

    if (!isSignInWithEmailLink(auth, window.location.href)) {
        throw routerCreateRedirectResponse('root')
    }

    const firebaseEmailWaitingVerification = localStorageGetFirebaseEmailWaitingToBeVerified()

    if (!firebaseEmailWaitingVerification) {
        throw routerCreateRedirectResponse('root')
    }

    const signInWithEmailLinkFunction = async () => {
        await signInWithEmailLink(auth, firebaseEmailWaitingVerification, window.location.href)
        localStorageRemoveFirebaseEmailWaitingToBeVerified()
        return null
    }

    return {
        email: firebaseEmailWaitingVerification,
        deferred: defer({
            signInWithEmailLink: signInWithEmailLinkFunction(),
        }),
    }
}

export const Component = () => {
    const {
        email,
        deferred,
    } = usePageLoaderData<typeof loader>()
    console.log(deferred)

    return (
        <Suspense
            fallback={(
                <AuthForm
                    severity="info"
                    actionnName="..."
                    title="Validating email link..."
                    initialEmailAddress={email}
                    instructions="Please wait, the validation process may take a few seconds."
                    actionIsDisabled
                    inputIsDisabled
                />
            )}
        >
            <Await
                resolve={deferred.data.signInWithEmailLink}
                errorElement={(
                    <RouteForm method="GET" resource={routerGetPath('root')}>
                        <AuthForm
                            severity="error"
                            actionnName="Return"
                            title="Invalid email link"
                            initialEmailAddress={email}
                            instructions="The email link is invalid or expired. Please request a new one."
                            actionIsDisabled={false}
                            inputIsDisabled
                        />
                    </RouteForm>
                )}
            >
                {() => <Navigate to={routerGetPath('root')} replace />}
            </Await>
        </Suspense>
    )
}
