import { createBrowserRouter } from 'react-router-dom'
import routerGetPaths from './routerGetPaths.ts'

const routerCreate = () => {
  const paths = routerGetPaths()
  return createBrowserRouter([
    {
      path: paths.root,
      lazy: () => import('../components/PageRoot.tsx'),
    },
    {
      path: paths.nouser,
      lazy: () => import('../components/PageNouser.tsx'),
      children: [
        {
          path: '',
          lazy: () => import('../components/PageAuth.tsx'),
        },
        {
          path: paths.authWaitingEmailVerificationLink,
          lazy: () => import('../components/PageAuthWaitingEmailVerificationLink.tsx'),
        },
        {
          path: paths.authProcessingLink,
          lazy: () => import('../components/PageAuthProcessingLink.tsx'),
        },
      ],
    },
  ])
}

export default routerCreate
