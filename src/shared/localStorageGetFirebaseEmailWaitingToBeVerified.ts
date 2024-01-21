import { BrowserLocalStorageKeys } from './browserLocalStorageKeys'

const localStorageGetFirebaseEmailWaitingToBeVerified = () => window.localStorage.getItem(BrowserLocalStorageKeys.FIREBASE_EMAIL_WAITING_TO_BE_VERIFIED)

export default localStorageGetFirebaseEmailWaitingToBeVerified
