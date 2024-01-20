import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import App from './App.tsx'
import './index.css'
import stateStoreCreate from './shared/storeCreate.ts'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00796b',
      light: '#80cbc4',
    },
    secondary: {
      main: '#303f9f',
    },
    background: {
      default: '#eceff1',
      paper: '#e0f2f1',
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
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
)
