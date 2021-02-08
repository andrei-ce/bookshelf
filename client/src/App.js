import React from 'react';
import { ChakraProvider, theme as defaultTheme, CSSReset } from '@chakra-ui/react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './Components/NavBar';
import LandingPage from './Pages/Landing';
import AuthorsPage from './Pages/Authors';

const theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    transparent: {
      100: 'rgba(0, 0, 0, 0.20)',
      300: 'rgba(0, 0, 0, 0.40)',
      500: 'rgba(0, 0, 0, 0.60)',
      700: 'rgba(0, 0, 0, 0.70)',
      900: 'rgba(0, 0, 0, 0.80)',
    },
  },
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/authors' component={AuthorsPage} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
