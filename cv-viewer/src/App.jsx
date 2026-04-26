import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../src/ThemeProvider'; // Import the theme.js we created earlier
import { BuilderPage } from './pages/BuilderPage'
import { Home } from './pages/Home'
import { ReviewPage } from './pages/ReviewPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline ensures the background color #f1f5f9 is applied to the body */}
      <CssBaseline /> 

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/review" element={<ReviewPage />} />
          {/* Add other routes as needed */}
        </Routes>
      
    </ThemeProvider>
  );
}

export default App;