import React, { Suspense } from 'react';
import './App.css';

import {Provider} from './logic/DataProvider'
import Layout from './Theme.js'
import MainPage from './layout/MainPage';
import { router } from './routes';
import Loading from './components/Loading';
import { isAuthenticated } from './logic/utils';
import {RouterProvider } from 'react-router-dom'

// const RenderRoute = (route) => {
//   const history = useHistory();

//   document.title = route.title || "Lists App";
//   if (route.needsAuth && !isAuthenticated()) {
//     history.push("/user/login");
//   }
//   return (
//     <Route
//       path={route.path}
//       exact
//       render={(props) => <route.component {...props} />}
//     ></Route>
//   );
// };

function App() {

  
  return (

     <Provider>
      <Layout>
        <RouterProvider router={router} />
        {/* <Router>
          <Suspense fallback={Loading}>
            <Switch>
              {
                routes.map((route,index)=>{
                  <RenderRoute {...route} key={index} />
                })
              }
            </Switch>
          </Suspense>
            </Router> */}

        
      </Layout>
    </Provider>
    
  );
}

export default App;
