import { getDoc } from 'firebase/firestore'
import firestoreGetUserDocumentRef from './firestoreGetUserDocumentRef'

const firestoreGetUserDocument = async (userId: string) => {
    const userDocumentSnap = await getDoc(firestoreGetUserDocumentRef(userId))

    const userDocument = userDocumentSnap.data()

    return userDocument
}

export default firestoreGetUserDocument
