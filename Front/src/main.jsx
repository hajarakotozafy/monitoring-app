import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import ApolloAppProvider from './core/graphql/ApolloProvider';

import { ThemeProvider } from 'styled-components';
import Theme from './core/theme';
import { GlobalStyles } from './core/theme/GlobalStyles';

import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloAppProvider>
      <ThemeProvider theme={Theme}>
        <Router>
          <GlobalStyles/>
          <App />
        </Router>
      </ThemeProvider>
    </ApolloAppProvider>
  </React.StrictMode>,
)
