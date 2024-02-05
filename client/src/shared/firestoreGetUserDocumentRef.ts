import { doc } from 'firebase/firestore'
import firebaseGetFirestore from './firebaseGetFirestore'

const firestoreGetUserDocumentRef = (userId: string) => doc(firebaseGetFirestore(), `Users/${userId}`)

export default firestoreGetUserDocumentRef
