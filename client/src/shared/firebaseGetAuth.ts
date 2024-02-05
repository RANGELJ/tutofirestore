import { getAuth } from 'firebase/auth';
import firebaseGetApp from './firebaseGetApp';

const firebaseGetAuth = () => getAuth(firebaseGetApp())

export default firebaseGetAuth
