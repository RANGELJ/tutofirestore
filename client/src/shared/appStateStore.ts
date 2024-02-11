import { User } from 'firebase/auth'

export type AppState = {
    firebase: {
        user: User | null;
        userIsLoaded: boolean;
    };
}

export type AppStateSelector<T> = (state: AppState) => T

export type AppStateReducer = (state: AppState) => AppState

type SubscriptionCallback = () => void

const appStateStore = (() => {
    let state: AppState = {
        firebase: {
            user: null,
            userIsLoaded: false,
        },
    }

    let subscriptions: SubscriptionCallback[] = []

    return {
        getState: () => state,
        dispatch: (reducer: AppStateReducer) => {
            const newState = reducer(state)
            if (newState === state) {
                return
            }
            state = newState
            subscriptions.forEach((sub) => sub())
        },
        subscribe: (callback: SubscriptionCallback) => {
            subscriptions.push(callback)
            return () => {
                subscriptions = subscriptions.filter((sub) => sub !== callback)
            }
        },
    } as const
})()

export default appStateStore
