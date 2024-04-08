import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './store/store';
import { BrowserRouter } from 'react-router-dom';

interface State {
  store: Store,
}

const store = new Store();

export const Context = createContext<State>({
  store,
})


ReactDOM.render(
  <BrowserRouter>
    <Context.Provider value={{
      store
    }}>
      <App />
    </Context.Provider>
  </BrowserRouter>,
  document.getElementById('root')
);