import { Workspace } from 'shared/types'
import serverFetch from './serverFetch'

const serverFetchWorkspaces = async () => {
  const data = await serverFetch({
    path: 'my/workspaces',
  })
  return data as Workspace[]
}

export default serverFetchWorkspaces
