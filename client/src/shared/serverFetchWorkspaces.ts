import { Workspace } from 'shared/types'
import serverFetch from './serverFetch'
import appStateStore from './appStateStore'
import selectWorkspaces from '../appStateSelectors/selectWorkspaces'
import setWorkspaces from '../appStateReducers/setWorkspaces'

const serverFetchWorkspaces = async () => {
  const fromStore = selectWorkspaces(appStateStore.getState())
  if (fromStore) {
    console.log('fromStore')
    return fromStore
  }
  const data = await serverFetch({
    path: 'my/workspaces',
  })
  const workspacesFromServer = data as Workspace[]
  appStateStore.dispatch(setWorkspaces(workspacesFromServer))
  console.log('From server')
  return workspacesFromServer
}

export default serverFetchWorkspaces
