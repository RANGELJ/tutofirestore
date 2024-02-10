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
  console.log('response', response)

  if (response.status !== 200) {
    throw await response.text()
  }

  const data = await response.json()

  console.log('data', data)
}

export default serverRequest
