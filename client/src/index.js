import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {Provider} from './components/DataProvider'
ReactDOM.render(
  
    <Provider>
    <App />
    </Provider>,
  document.getElementById('root')
);


