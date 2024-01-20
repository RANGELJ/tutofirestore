import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'
import firebaseGetApp from './shared/firebaseGetApp'
import { useSelector } from 'react-redux'
import AuthForm from './components/AuthForm'
import storeSelectFirebaseAuthEmailAdressWaiting from './shared/storeSelectFirebaseAuthEmailAdressWaiting'
import useDispatch from './hooks/useDispatch'
import { StoreActionType } from './shared/storeAction'
import { useState } from 'react'

const App = () => {
  const [sendingEmail, setSendingEmail] = useState(false)
  const [emailAdress, setEmailAdress] = useState('georgeranpe@gmail.com')
  const firebaseEmailWaiting = useSelector(storeSelectFirebaseAuthEmailAdressWaiting)
  const dispatch = useDispatch()

  return (
    <AuthForm
      title={firebaseEmailWaiting ? 'Waiting for email verification' : 'Welcome'}
      autoFocus={!firebaseEmailWaiting}
      emailAdress={emailAdress}
      instructions={firebaseEmailWaiting
          ? 'Please check your invoice'
          : 'Please enter your email adress and then click on the button to send a verification email'}
      resetIsDisabled={firebaseEmailWaiting === null || sendingEmail}
      sendIsDisabled={firebaseEmailWaiting !== null || sendingEmail}
      onChangeEmailAdress={setEmailAdress}
      onReset={() => {
        dispatch({
          type: StoreActionType.SET_FIREBASE_AUTH_EMAIL_ADRESS_WAITING,
          payload: null,
        })
      }}
      onSend={() => {
        const firebaseAuth = getAuth(firebaseGetApp())
        setSendingEmail(true)
        sendSignInLinkToEmail(firebaseAuth, emailAdress, {
          url: `${window.location.protocol}//${window.location.host}`,
          handleCodeInApp: true,
        })
          .finally(() => {
            setSendingEmail(false)
          })
          .then(() => {
            dispatch({
              type: StoreActionType.SET_FIREBASE_AUTH_EMAIL_ADRESS_WAITING,
              payload: emailAdress,
            })
          })
          .catch(() => {
            dispatch({
              type: StoreActionType.SET_FIREBASE_AUTH_EMAIL_ADRESS_WAITING,
              payload: null,
            })
          })
      }}
    />
  )
}

export default App
