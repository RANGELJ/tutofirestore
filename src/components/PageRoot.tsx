/* eslint-disable react-refresh/only-export-components */
import firebaseGetCurrentUser from '../shared/firebaseGetCurrentUser'
import routerCreateRedirectResponse from '../shared/routerCreateRedirectResponse'

export const loader = async () => {
  const user = await firebaseGetCurrentUser()

  if (user) {
    return null
  }

  throw routerCreateRedirectResponse('nouser')
}

export const Component = () => <div>Hello</div>
