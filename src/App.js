import React from 'react';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configueStore';

const App =() => {
  return (
    <Provider store={ConfigureStore()}>
    <BrowserRouter>
     <Main />
     </BrowserRouter>
     </Provider>
  );
}

export default App;
