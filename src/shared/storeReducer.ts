import type { StoreState } from './storeState'
import { StoreActionType, type StoreAction } from './storeAction'
import storeDefaultState from './storeDefaultState'
import storeSelectFirebaseAuthEmailAdressWaiting from './storeSelectFirebaseAuthEmailAdressWaiting'

const storeReducer = (stateFromArgs: StoreState | undefined, action: StoreAction): StoreState => {
    const state = stateFromArgs ?? storeDefaultState

    switch (action.type) {
    case StoreActionType.LOAD_DATA_FROM_LOCAL_STORAGE: {
        const current = storeSelectFirebaseAuthEmailAdressWaiting(state)

        if (current === action.payload.firebase.auth.emailAdressWaiting) {
            return state
        }

        return {
            ...state,
            firebase: {
                ...state.firebase,
                auth: {
                    ...state.firebase.auth,
                    emailAdressWaiting: action.payload.firebase.auth.emailAdressWaiting,
                },
            },
        }
    }
    default:
        return state
    }
}

export default storeReducer
