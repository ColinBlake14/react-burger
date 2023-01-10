import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import '@ya.praktikum/react-developer-burger-ui-components';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer, TApplicationActions } from './services/reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { socketMiddleware } from './services/socket-middleware/socket-middleware';

import { 
  connect as LiveOrdersWsConnect,
  disconnect as LiveOrdersWsDiconnect,
  wsOpen as LiveOrdersWsOpen,
  wsClose as LiveOrdersWsClose,
  wsMessage as LiveOrdersWsMessage,
  wsError as LiveOrdersWsError,
  wsConnecting as LiveOrdersWsConnecting
} from './services/actions/ws-actions';

const liveOrdersMiddleware = socketMiddleware({
  wsConnect: LiveOrdersWsConnect,
  wsDisconnect: LiveOrdersWsDiconnect,
  wsConnecting: LiveOrdersWsConnecting,
  onOpen: LiveOrdersWsOpen,
  onClose: LiveOrdersWsClose,
  onError: LiveOrdersWsError,
  onMessage: LiveOrdersWsMessage,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, liveOrdersMiddleware)));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
