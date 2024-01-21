import { createBrowserRouter } from 'react-router-dom'
import routerGetPaths from './routerGetPaths.ts'

const routerCreate = () => {
  const paths = routerGetPaths()
  return createBrowserRouter([
    {
      path: paths.home,
      lazy: () => import('../components/PageHome.tsx'),
    },
    {
      path: paths.auth,
      lazy: () => import('../components/PageAuth.tsx'),
    },
    {
      path: paths.authWaitingEmailVerificationLink,
      lazy: () => import('../components/PageAuthWaitingEmailVerificationLink.tsx'),
    },
  ])
}

export default routerCreate
