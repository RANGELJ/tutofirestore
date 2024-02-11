import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { blueGrey, grey, lightBlue, teal } from '@mui/material/colors'
import {
  RouterProvider,
} from 'react-router-dom'
import routerCreate from './shared/routerCreate'

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
