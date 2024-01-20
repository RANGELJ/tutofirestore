import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import './index.css'
import stateStoreCreate from './shared/storeCreate.ts'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { blueGrey, grey, lightBlue, teal } from '@mui/material/colors'
import {
  RouterProvider,
} from 'react-router-dom'
import appCreateRouter from './shared/appCreateRouter.tsx'

const router = appCreateRouter()

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
    <ReduxProvider store={stateStoreCreate()}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
)
