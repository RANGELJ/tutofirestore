import React, { useEffect } from 'react'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { blueGrey, grey, lightBlue, teal } from '@mui/material/colors'
import {
  RouterProvider,
} from 'react-router-dom'
import routerCreate from '../shared/routerCreate'
import firebaseGetAuth from '../shared/firebaseGetAuth'
import { onAuthStateChanged } from 'firebase/auth'
import routerGetPath from '../shared/routerGetPath'

const router = routerCreate()

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: teal,
    secondary: lightBlue,
    background: {
      default: grey[50],
      paper: blueGrey[50],
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
})

const App = () => {
  useEffect(() => onAuthStateChanged(firebaseGetAuth(), (user) => {
    if (!user) {
      router.navigate(routerGetPath('nouser'))
    } else {
      router.navigate(routerGetPath('root'))
    }
  }), [])

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App
