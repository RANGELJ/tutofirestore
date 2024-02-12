import type { User } from 'firebase/auth';
import type { AppState, AppStateReducer } from '../shared/appStateStore';
import selectFirebaseUser from '../appStateSelectors/selectFirebaseUser'
import selectFirebaseUserIsLoaded from '../appStateSelectors/selectFirebaseUserIsLoaded';

const setFirebaseUser = (user: User | null): AppStateReducer => (state) => {
  const currentUser = selectFirebaseUser(state)

  if (!selectFirebaseUserIsLoaded(state)) {
    const newState: AppState = {
      ...state,
      firebase: {
        ...state.firebase,
        user,
        userIsLoaded: true,
      },
    }

    delete newState.workspaces

    return newState
  }

  if (currentUser === user) {
    return state
  }

  const newState: AppState = {
    ...state,
    firebase: {
      ...state.firebase,
      user,
    },
  }

  delete newState.workspaces

  return newState
}

export default setFirebaseUser
