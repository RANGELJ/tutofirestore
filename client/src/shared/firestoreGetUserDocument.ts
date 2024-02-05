import { getDoc } from 'firebase/firestore'
import firestoreGetUserDocumentRef from './firestoreGetUserDocumentRef'

type DocUser = {
    workspaces?: string[];
}

const firestoreGetUserDocument = async (userId: string) => {
    const userDocumentSnap = await getDoc<DocUser, DocUser>(firestoreGetUserDocumentRef(userId))

    const userDocument = userDocumentSnap.data()

    return userDocument
}

export default firestoreGetUserDocument
