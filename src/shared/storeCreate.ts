import { applyMiddleware, createStore, type Store as ReduxStore } from 'redux'
import storeReducer from './storeReducer'
import { BrowserLocalStorageKeys } from './browserLocalStorageKeys'
import { StoreAction, StoreActionType } from './storeAction'
import { StoreState } from './storeState'
import storeMiddlewareLocalStorage from './storeMiddlewareLocalStorage'

const stateStoreCreate = () => {
    const store: ReduxStore<StoreState, StoreAction> = createStore(
        storeReducer,
        applyMiddleware(
            storeMiddlewareLocalStorage,
        ),
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
