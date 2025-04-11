import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../../src/App.css'; // Ensure to import custom CSS

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate function

  const items = [
    { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
    { label: 'clients RDV', icon: 'pi pi-fw pi-user', to: '/test' },
    { label: 'RDV', icon: 'pi pi-fw pi-calendar', to: '/rdv' },
    { label: 'Users', icon: 'pi pi-fw pi-user', to: '/users' },
    { label: 'History', icon: 'pi pi-fw pi-user', to: '/history' },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear user data from localStorage
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("token"); // Clear the token as well
  
        // Show success message after logout
        Swal.fire({
          title: "Logged out!",
          text: "You have successfully logged out.",
          icon: "success"
        }).then(() => {
          // Redirect to the login page after logout
          navigate("/login");
        });
      }
    });
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="p-3" style={{ fontSize: '0.75rem' }}>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="d-flex justify-content-between w-100" style={{ fontSize: '0.75rem' }}>
            {/* Left side links */}
            <div className="d-flex" style={{ fontSize: '0.75rem' }}>
              {items.map((item, index) => (
                <Nav.Link
                  key={index}
                  as={Link}
                  to={item.to}
                  className={`d-flex align-items-center mr-4 ml-4 ${location.pathname === item.to ? 'active' : ''}`}
                  style={{ marginLeft: '30px', marginRight: '30px', fontSize: '0.75rem' }}
                >
                  <i className={item.icon} style={{ marginRight: '8px' }}></i>
                  {item.label}
                </Nav.Link>
              ))}
            </div>

            {/* Right side profile */}
            <div className="d-flex align-items-center">
              <Nav style={{ fontSize: '0.75rem' }}>
                <NavDropdown title={<i className="pi pi-user" />} id="navbar-profile-dropdown" align="end" style={{ fontSize: '0.75rem' }}>
                  <NavDropdown.Item href="/profile" style={{ fontSize: '0.75rem' }}>Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/settings" style={{ fontSize: '0.75rem' }}>Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} style={{ fontSize: '0.75rem' }}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Add margin-top to the main content to prevent overlap with fixed navbar */}
      <div style={{ marginTop: '70px' }}>
        {/* Your main content goes here */}
      </div>
    </div>
  );
}
