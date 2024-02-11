import { type User } from 'firebase/auth'
import appStateStore from './appStateStore'
import selectFirebaseUserIsLoaded from '../appStateSelector/selectFirebaseUserIsLoaded'
import selectFirebaseUser from '../appStateSelector/selectFirebaseUser'

const firebaseGetCurrentUser = () => new Promise<User | null>((resolve) => {
    const isLoaded = selectFirebaseUserIsLoaded(appStateStore.getState())

    if (isLoaded) {
        resolve(selectFirebaseUser(appStateStore.getState()))
        return
    }

    const unsubscribe = appStateStore.subscribe(() => {
        const user = selectFirebaseUser(appStateStore.getState())
        const isLoaded = selectFirebaseUserIsLoaded(appStateStore.getState())

        if (isLoaded) {
            unsubscribe()
            resolve(user)
        }
    })
})

export default firebaseGetCurrentUser
