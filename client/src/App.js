import React from 'react';
import './App.css';

import {Provider} from './logic/DataProvider'
import Layout from './Theme.js'
import { router } from './routes';
import {RouterProvider } from 'react-router-dom'
import {ToastContainer } from 'react-toastify';
import Footer from './components/Footer';

function App() {

  return (

     <Provider>
      <Layout>
        <RouterProvider router={router} /> 
        <Footer />
        <ToastContainer 
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          // draggable
          // pauseOnHover
      />    
      </Layout>
    </Provider>
    
  );
}

export default App;
