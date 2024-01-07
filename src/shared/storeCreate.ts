import { createStore } from 'redux'
import storeReducer from './storeReducer'
import { BrowserLocalStorageKeys } from './browserLocalStorageKeys'
import { StoreActionType } from './storeAction'

const stateStoreCreate = () => {
    const store = createStore(
        storeReducer,
    )

    const firebaseEmailWaitingVerification = window.localStorage.getItem(BrowserLocalStorageKeys.FIREBASE_EMAIL_WAITING_TO_BE_VERIFIED)

    store.dispatch({
        type: StoreActionType.LOAD_DATA_FROM_LOCAL_STORAGE,
        payload: {
            firebase: {
                auth: {
                    emailAdressWaiting: firebaseEmailWaitingVerification,
                },
            },
        },
    })

    return store
}

export type Store = ReturnType<typeof stateStoreCreate>

export default stateStoreCreate
