import type { StoreState } from './storeState'
import { type StoreAction } from './storeAction'
import storeDefaultState from './storeDefaultState'

const storeReducer = (stateFromArgs: StoreState | undefined, action: StoreAction): StoreState => {
    const state = stateFromArgs ?? storeDefaultState

    switch (action.type) {
    default:
        return state
    }
}

export default storeReducer
