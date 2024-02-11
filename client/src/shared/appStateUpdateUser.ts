import { User } from 'firebase/auth';
import { AppStateReducer } from './appStateStore';
import selectFirebaseUser from '../appStateSelector/selectFirebaseUser'
import selectFirebaseUserIsLoaded from '../appStateSelector/selectFirebaseUserIsLoaded';

const appStateUpdateUser = (user: User | null): AppStateReducer => (state) => {
  const currentUser = selectFirebaseUser(state)

  if (!selectFirebaseUserIsLoaded(state)) {
    return {
      ...state,
      firebase: {
        ...state.firebase,
        user,
        userIsLoaded: true,
      },
    }
  }

  if (currentUser === user) {
    return state
  }

  return {
    ...state,
    firebase: {
      ...state.firebase,
      user,
    },
  }
}

export default appStateUpdateUser
