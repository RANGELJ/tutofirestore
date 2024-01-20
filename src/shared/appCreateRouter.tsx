import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

const appCreateRouter = () => createBrowserRouter(createRoutesFromElements(<>
  <Route
    path="/"
    lazy={() => import('../components/PageHome.tsx')}
  />
  <Route
    path="/auth"
    lazy={() => import('../components/PageAuth.tsx')}
  />
</>))

export default appCreateRouter
