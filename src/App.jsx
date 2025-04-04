import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
import AppRoutes from "./components/Routes";
import './index.css';

// PrimeReact and Bootstrap
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';
import store from "./app/store";

function App() {

//  isLoggedIn={isLoggedIn} 
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <Router>
          <Layout>
            <AppRoutes/>
          </Layout>
        </Router>
      </PrimeReactProvider>
    </Provider>
  );
}

export default App;
