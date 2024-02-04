import { redirect } from 'react-router-dom'
import firebaseGetAuth from './firebaseGetAuth'
import routerGetPaths from './routerGetPaths'

const pageLoaderEnsureNotAuthenticated = () => {
    const { currentUser } = firebaseGetAuth()
    if (currentUser) {
        throw redirect(routerGetPaths().root)
    }
}

export default pageLoaderEnsureNotAuthenticated
