import routerCreateRedirectResponse from '../shared/routerCreateRedirectResponse'
import serverFetchWorkspaces from '../shared/serverFetchWorkspaces'

/* eslint-disable react-refresh/only-export-components */
export const loader = async () => {
    const workspaces = await serverFetchWorkspaces()

    if (workspaces.length === 0) {
        throw routerCreateRedirectResponse('workspaces/first')
    }

    return workspaces
}

export const Component = () => null