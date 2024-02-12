import type { AppState } from '../shared/appStateStore'

const selectFirebaseUserIsLoaded = (state: AppState) => state.firebase.userIsLoaded

export default selectFirebaseUserIsLoaded
