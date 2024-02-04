/* eslint-disable react-refresh/only-export-components */

import { Outlet, redirect } from 'react-router-dom'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import routerGetPaths from '../shared/routerGetPaths'

export const loader = () => {
    const { currentUser } = firebaseGetAuth()
    if (currentUser) {
        throw redirect(routerGetPaths().root)
    }
    return null
}

export const Component = () => <Outlet />
