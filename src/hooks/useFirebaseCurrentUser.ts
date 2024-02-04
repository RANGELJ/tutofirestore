import { useEffect, useState } from 'react'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import { onAuthStateChanged } from 'firebase/auth'

const useFirebaseCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(firebaseGetAuth().currentUser)

    useEffect(() => onAuthStateChanged(firebaseGetAuth(), setCurrentUser), [])

    return currentUser
}

export default useFirebaseCurrentUser
