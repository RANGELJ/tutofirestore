import admin from 'firebase-admin'
import { App, applicationDefault } from 'firebase-admin/app'

let createdApp: App | undefined

const firebaseAdminSdkGetApp = () => {
    if (createdApp) {
        return createdApp
    }
    createdApp = admin.initializeApp({
        credential: applicationDefault(),
    })
    return createdApp
}

export default firebaseAdminSdkGetApp
