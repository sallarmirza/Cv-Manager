import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import { theme } from './ThemeProvider.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme} >
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
