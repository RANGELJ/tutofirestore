import { createBrowserRouter } from 'react-router-dom'
import routerGetPath from './routerGetPath.ts'

const routerCreate = () => createBrowserRouter([
  {
    path: routerGetPath('root'),
    lazy: () => import('../components/PageRoot.tsx'),
  },
  {
    path: routerGetPath('nouser'),
    lazy: () => import('../components/PageNouser.tsx'),
    children: [
      {
        path: '',
        lazy: () => import('../components/PageNouserEmailForm.tsx'),
      },
      {
        path: routerGetPath('nouser/waitingEmailVerificationLink').split('/').at(-1),
        lazy: () => import('../components/PageNouserWaitingEmailVerificationLink.tsx'),
      },
      {
        path: routerGetPath('nouser/processingLink').split('/').at(-1),
        lazy: () => import('../components/PageNouserProcessingLink.tsx'),
      },
    ],
  },
])

export default routerCreate
