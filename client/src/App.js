import React from 'react';
import { ChakraProvider, theme, CSSReset } from '@chakra-ui/react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './Components/NavBar';
import Landing from './Views/Landing';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Landing} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
