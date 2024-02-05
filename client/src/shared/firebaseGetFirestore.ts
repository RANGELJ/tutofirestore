import { getFirestore } from 'firebase/firestore'
import firebaseGetApp from './firebaseGetApp'

const firebaseGetFirestore = () => getFirestore(firebaseGetApp())

export default firebaseGetFirestore
