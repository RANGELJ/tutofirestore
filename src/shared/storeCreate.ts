import { createStore, type Store as ReduxStore } from 'redux'
import storeReducer from './storeReducer'
import { StoreAction } from './storeAction'
import { StoreState } from './storeState'

const stateStoreCreate = () => {
    const store: ReduxStore<StoreState, StoreAction> = createStore(
        storeReducer,
    )

    return store
}

export type Store = ReturnType<typeof stateStoreCreate>

export default stateStoreCreate
