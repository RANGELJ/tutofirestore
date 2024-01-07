import type { StoreState } from './storeState'

const storeDefaultState: StoreState = {
    firebase: {
        auth: {
            emailAdressWaiting: null,
        },
    },
}

export default storeDefaultState
