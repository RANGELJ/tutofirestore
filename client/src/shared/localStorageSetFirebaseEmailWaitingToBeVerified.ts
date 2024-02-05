import { BrowserLocalStorageKeys } from './browserLocalStorageKeys'

const localStorageSetFirebaseEmailWaitingToBeVerified = (value: string) => window
    .localStorage
    .setItem(BrowserLocalStorageKeys.FIREBASE_EMAIL_WAITING_TO_BE_VERIFIED, value)

export default localStorageSetFirebaseEmailWaitingToBeVerified
