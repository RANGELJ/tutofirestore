import type { Dispatch, MiddlewareAPI } from 'redux'
import type { StoreState } from './storeState'
import type { StoreAction } from './storeAction'
import storeSelectFirebaseAuthEmailAdressWaiting from './storeSelectFirebaseAuthEmailAdressWaiting'
import { BrowserLocalStorageKeys } from './browserLocalStorageKeys'

const storeMiddlewareLocalStorage = (
    api: MiddlewareAPI<Dispatch<StoreAction>, StoreState>,
) => (next: (action: unknown) => unknown) => (action: unknown) => {
    const stateBefore = api.getState()
    next(action)
    const stateAfter = api.getState()

    const emailBefore = storeSelectFirebaseAuthEmailAdressWaiting(stateBefore)
    const emailAfter = storeSelectFirebaseAuthEmailAdressWaiting(stateAfter)

    if (emailBefore !== emailAfter) {
        console.log('Re sync with local storage', emailAfter)
        if (emailAfter) {
            window.localStorage.setItem(BrowserLocalStorageKeys.FIREBASE_EMAIL_WAITING_TO_BE_VERIFIED, emailAfter)
        } else {
            window.localStorage.removeItem(BrowserLocalStorageKeys.FIREBASE_EMAIL_WAITING_TO_BE_VERIFIED)
        }
    }
}

export default storeMiddlewareLocalStorage
