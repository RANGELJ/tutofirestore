import type { AppStateReducer } from '../shared/appStateStore'
import selectFirebaseUser from '../appStateSelectors/selectFirebaseUser'
import { Workspace } from 'shared/types'
import selectWorkspaces from '../appStateSelectors/selectWorkspaces'

const setWorkspaces = (workspaces: Workspace[]): AppStateReducer => (state) => {
  const currentUser = selectFirebaseUser(state)

  if (!currentUser) {
    return state
  }

  const currentWorkspaces = selectWorkspaces(state)

  if (currentWorkspaces === workspaces) {
    return state
  }

  return {
    ...state,
    workspaces,
  }
}

export default setWorkspaces
