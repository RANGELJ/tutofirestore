import type { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'

const firestoreMapQuerySnapshot = <T>(
    snapshot: QuerySnapshot<DocumentData, DocumentData>,
    callback: (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => T
) => {
    const result: T[] = []
    snapshot.forEach((doc) => {
        result.push(callback(doc))
    })
    return result
}

export default firestoreMapQuerySnapshot
