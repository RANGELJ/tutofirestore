/* eslint-disable react-refresh/only-export-components */
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import { Await, Navigate, defer, redirect } from 'react-router-dom'
import routerGetPaths from '../shared/routerGetPaths'
import localStorageGetFirebaseEmailWaitingToBeVerified from '../shared/localStorageGetFirebaseEmailWaitingToBeVerified'
import usePageLoaderData from '../hooks/usePageLoaderData'
import AuthForm from './AuthForm'
import { Suspense } from 'react'
import RouteForm from './RouteForm'

export const loader = async () => {
    const auth = firebaseGetAuth()

    if (!isSignInWithEmailLink(auth, window.location.href)) {
        throw redirect(routerGetPaths().root)
    }

    const firebaseEmailWaitingVerification = localStorageGetFirebaseEmailWaitingToBeVerified()

    if (!firebaseEmailWaitingVerification) {
        throw redirect(routerGetPaths().root)
    }

    return {
        email: firebaseEmailWaitingVerification,
        deferred: defer({
            signInWithEmailLink: signInWithEmailLink(auth, firebaseEmailWaitingVerification, window.location.href),
        }),
    }
}

export const Component = () => {
    const {
        email,
        deferred,
    } = usePageLoaderData<typeof loader>()

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
                    <RouteForm method="GET" resource={routerGetPaths().root}>
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
                {() => <Navigate to={routerGetPaths().root} replace />}
            </Await>
        </Suspense>
    )
}
