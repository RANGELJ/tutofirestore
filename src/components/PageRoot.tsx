/* eslint-disable react-refresh/only-export-components */
import { signOut } from 'firebase/auth'
import firebaseGetCurrentUser from '../shared/firebaseGetCurrentUser'
import routerCreateRedirectResponse from '../shared/routerCreateRedirectResponse'
import firebaseGetAuth from '../shared/firebaseGetAuth'

export const loader = async () => {
  const user = await firebaseGetCurrentUser()

  if (user) {
    return null
  }

  throw routerCreateRedirectResponse('nouser')
}

export const Component = () => (
  <button onClick={() => signOut(firebaseGetAuth())}>Clear</button>
)
