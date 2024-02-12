import type { AppState } from '../shared/appStateStore'

const selectWorkspaces = (state: AppState) => state.workspaces

export default selectWorkspaces
