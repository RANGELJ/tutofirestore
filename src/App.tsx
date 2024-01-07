import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink } from 'firebase/auth'
import firebaseGetApp from './shared/firebaseGetApp'
import { BrowserLocalStorageKeys } from './shared/browserLocalStorageKeys'
import { useSelector } from 'react-redux'
import storeSelectFirebaseAuthEmailAdressWaiting from './shared/storeSelectFirebaseAuthEmailAdressWaiting'

const App = () => {
  const emailAdress = 'georgeranpe@gmail.com'
  const firebaseAuth = getAuth(firebaseGetApp())
  const firebaseEmailWaiting = useSelector(storeSelectFirebaseAuthEmailAdressWaiting)

  console.log('firebaseEmailWaiting', firebaseEmailWaiting)
  console.log('hasAuthDataOnUrl', isSignInWithEmailLink(firebaseAuth, window.location.href))

  return (
    <div>
      {firebaseEmailWaiting && (
        <div>
          <p>Waiting for email verification</p>
          <p>Please check your Inbox</p>
          <p>{firebaseEmailWaiting}</p>
        </div>
      )}
      <button
        type="button"
        disabled={firebaseEmailWaiting !== null}
        onClick={() => {
          sendSignInLinkToEmail(firebaseAuth, emailAdress, {
            url: `${window.location.protocol}//${window.location.host}`,
            handleCodeInApp: true,
          })
            .then(() => {
              window.localStorage.setItem(BrowserLocalStorageKeys.FIREBASE_EMAIL_WAITING_TO_BE_VERIFIED, emailAdress)
              console.log('Done!')
            })
            .catch(() => {
              console.log('Error!')
            })
        }}
      >
        Send email
      </button>
      <button
        type="reset"
        disabled={firebaseEmailWaiting === null}
        onClick={() => {
          window.localStorage.removeItem(BrowserLocalStorageKeys.FIREBASE_EMAIL_WAITING_TO_BE_VERIFIED)
        }}
      >
        Reset
      </button>
    </div>
  )
}

export default App
