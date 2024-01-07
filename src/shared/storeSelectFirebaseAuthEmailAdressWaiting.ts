import type { StoreState } from './storeState'

const storeSelectFirebaseAuthEmailAdressWaiting = (state: StoreState) => state
    .firebase
    .auth
    .emailAdressWaiting

export default storeSelectFirebaseAuthEmailAdressWaiting
