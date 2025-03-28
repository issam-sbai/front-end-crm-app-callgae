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
    { label: 'Clients', icon: 'pi pi-fw pi-users', to: '/clients' },
    { label: 'RDV', icon: 'pi pi-fw pi-calendar', to: '/rdv' },
    { label: 'Users', icon: 'pi pi-fw pi-user', to: '/users' },
    { label: 'clients RDV', icon: 'pi pi-fw pi-user', to: '/test' },

  ];

  // Logout function with confirmation
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

        // Show success message after logout
        Swal.fire({
          title: "Logged out!",
          text: "You have successfully logged out.",
          icon: "success"
        }).then(() => {
          // Refresh the page after logout
          window.location.reload();
        });
      }
    });
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="p-3">
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="d-flex justify-content-between w-100">
            {/* Left side links */}
            <div className="d-flex">
              {items.map((item, index) => (
                <Nav.Link
                  key={index}
                  as={Link}
                  to={item.to}
                  className={`d-flex align-items-center mr-4 ml-4 ${location.pathname === item.to ? 'active' : ''}`}
                  style={{ marginLeft: '30px', marginRight: '30px' }}
                >
                  <i className={item.icon} style={{ marginRight: '8px' }}></i>
                  {item.label}
                </Nav.Link>
              ))}
            </div>

            {/* Right side profile */}
            <div className="d-flex align-items-center">
              <Nav>
                <NavDropdown title={<i className="pi pi-user" />} id="navbar-profile-dropdown" align="end">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
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
