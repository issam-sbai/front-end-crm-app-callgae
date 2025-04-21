import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
import AppRoutes from "./components/Routes";
import './index.css';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

import { PrimeReactProvider } from 'primereact/api';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./features/clientSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    if (token && username && role) {
      dispatch(setUser({
        token,
        user: { username, role }
      }));
    }
  }, [dispatch]);

  return (
    <PrimeReactProvider>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
