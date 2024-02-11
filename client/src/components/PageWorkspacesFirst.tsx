/* eslint-disable react-refresh/only-export-components */
import routerLoaderEnsuredFirebaseUser from '../shared/routerLoaderEnsuredFirebaseUser'

export const loader = async () => {
    await routerLoaderEnsuredFirebaseUser()
    return null
}

export const Component = () => null