import { type User, onAuthStateChanged } from 'firebase/auth'
import firebaseGetAuth from './firebaseGetAuth'

const firebaseGetCurrentUser = () => new Promise<User | null>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(firebaseGetAuth(), (user) => {
        unsubscribe()
        resolve(user)
    }, reject)
})

export default firebaseGetCurrentUser
