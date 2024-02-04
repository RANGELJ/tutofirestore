/* eslint-disable react-refresh/only-export-components */

import { ActionFunction, Outlet } from 'react-router-dom'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import { sendSignInLinkToEmail } from 'firebase/auth'
import localStorageSetFirebaseEmailWaitingToBeVerified from '../shared/localStorageSetFirebaseEmailWaitingToBeVerified'
import routerGetPath from '../shared/routerGetPath'
import routerCreateRedirectResponse from '../shared/routerCreateRedirectResponse'
import browserGetHostWithProtocol from '../shared/browserGetHostWithProtocol'

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()
    const rawEmail = formData.get('email')
  
    if (!rawEmail) {
      throw new Response('Email is required', { status: 400 })
    }
  
    const email = rawEmail.toString()
  
    await sendSignInLinkToEmail(firebaseGetAuth(), email, {
      url: `${browserGetHostWithProtocol()}${routerGetPath('nouser/processingLink')}`,
      handleCodeInApp: true,
    })
  
    localStorageSetFirebaseEmailWaitingToBeVerified(email)
  
    return routerCreateRedirectResponse('nouser')
  }

export const loader = () => {
    const { currentUser } = firebaseGetAuth()

    if (currentUser) {
        throw routerCreateRedirectResponse('root')
    }

    return null
}

export const Component = () => <Outlet />
