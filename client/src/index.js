import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from './logic/DataProvider'
import Layout from './Theme.js'
ReactDOM.render(
  
    <Provider>
      <Layout>
        <App />
      </Layout>
    </Provider>,
  document.getElementById('root')
);


