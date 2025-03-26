import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import AddUserModal from "./AddUserModal";
import TableComponent from "./TableComponent"; // Assuming TableComponent is in the same directory
import FilterUserComponent from "./FilterUserComponent";

const User = () => {
  const [users, setUsers] = useState([]); // State to store the list of users
  const [loading, setLoading] = useState(true); // State to track loading status
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Fetch users from the API
  const fetchUsers = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://192.168.100.26:5000/api/user/all");
      setUsers(response.data); // Set users to the fetched data
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to handle adding a new user
  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]); // Add new user to the list
  };

  // Function to handle updating an existing user
  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  // Function to handle deleting a user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://192.168.100.26:5000/api/user/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>

<FilterUserComponent />
      <div className="d-flex justify-content-end mb-3 px-4">
        <Button variant="success" onClick={() => setShowModal(true)}>
          <i className="pi pi-plus"> </i> Add User
        </Button>
      </div>

      {/* Show loading spinner while fetching users */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <TableComponent users={users} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} />
      )}

      {/* Modal to add user */}
      <AddUserModal
        show={showModal}
        onHide={() => setShowModal(false)} // Close modal when done
        onAdd={handleAddUser} // Callback to handle adding user
      />
    </div>
  );
};

export default User;
