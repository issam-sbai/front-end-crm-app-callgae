import Sidebar from './Sidebar';

const Layout = ({ children }) => {


  return (
    <div>
      {/* Conditionally render Navbar if needed */}
      {/* <Navbar /> */}

      {/* Conditionally render Sidebar only if logged in */}
      {/* {isLoggedIn && <Sidebar /> } */}
      <Sidebar />
      {/* Main content */}
      <div style={{ padding: '20px', width: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
