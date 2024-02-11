import firebaseGetCurrentUser from './firebaseGetCurrentUser'
import routerCreateRedirectResponse from './routerCreateRedirectResponse'

const routerLoaderEnsuredFirebaseUser = async () => {
  const user = await firebaseGetCurrentUser()

  if (!user) {
    throw routerCreateRedirectResponse('nouser')
  }

  return user
}

export default routerLoaderEnsuredFirebaseUser
