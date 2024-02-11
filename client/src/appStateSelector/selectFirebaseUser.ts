import type { AppState } from '../shared/appStateStore'

const selectFirebaseUser = (state: AppState) => state.firebase.user

export default selectFirebaseUser
