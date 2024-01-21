import { BrowserLocalStorageKeys } from './browserLocalStorageKeys'

const localStorageRemoveFirebaseEmailWaitingToBeVerified = () => {
    window.localStorage.removeItem(BrowserLocalStorageKeys.FIREBASE_EMAIL_WAITING_TO_BE_VERIFIED)
}

export default localStorageRemoveFirebaseEmailWaitingToBeVerified
