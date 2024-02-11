export type AppState = {}

const appStateStore = (() => {
    const initialState: AppState = {}

    return {
        getState: () => initialState,
    }
})()

export default appStateStore
