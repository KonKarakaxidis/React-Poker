import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { HeaderBar, Table, Rooms, Modal } from 'components';

import { store, history } from 'utils';

import { storeConfig } from 'model'

storeConfig();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div style={{ height: '100vh', width: '100%' }}>
        <HeaderBar />
        <Modal />

        <Route path="/rooms/" component={Rooms} />
        <Route path="/table/" component={Table} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
