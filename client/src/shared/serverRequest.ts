import { getIdToken } from 'firebase/auth'
import firebaseGetAuth from './firebaseGetAuth'

const serverRequest = async () => {
  const { currentUser } = firebaseGetAuth()

  const idToken = currentUser
    ? await getIdToken(currentUser)
    : undefined
  
  const response = await fetch(`${import.meta.env.VITE_SERVER_HOST}/v1/my/workspaces`, {
    headers: idToken ? {
      Authorization: `Bearer ${idToken}`,
    } : undefined,
  })

  if (response.status !== 200) {
    throw await response.text()
  }

  const data: unknown = await response.json()

  return data
}

export default serverRequest
