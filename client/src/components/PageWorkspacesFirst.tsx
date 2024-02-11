import routerLoaderEnsuredFirebaseUser from '../shared/routerLoaderEnsuredFirebaseUser'

/* eslint-disable react-refresh/only-export-components */
export const loader = async () => {
    await routerLoaderEnsuredFirebaseUser()
    return null
}

export const Component = () => null