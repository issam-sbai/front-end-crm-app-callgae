import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {


  const token = localStorage.getItem('token') || useSelector(state => state.user.token);

  return (
    <div>
      {token && <Sidebar />}
      <div style={{ padding: '20px', width: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
