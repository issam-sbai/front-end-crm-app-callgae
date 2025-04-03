import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AddUserModal from "./AddUserModal";
import TableComponentuser from "./TableComponent";
import FilterComponenttest from '../test/TestFilter';
import { getAllUsersAsync } from "../../features/userSlice"; // Adjust the import path based on your file structure

const User = () => {
  // const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersAsync()); // Fetch users when the component is mounted
  }, [dispatch]);

  // const handleAddUser = (user) => {
  //   // Add the user to the state or handle post-submission logic here
  //   console.log('User added:', user);
  //   setShowModal(false); // Close the modal after user is added
  // };

  return (
    <div>
      <FilterComponenttest />
      <br />
      {/* <div className="d-flex justify-content-end mb-3 px-4">
        <Button variant="success" onClick={() => setShowModal(true)}>
          <i className="pi pi-plus"></i> Add User
        </Button>
      </div> */}
      {/* Show loading spinner while fetching users */}
      <TableComponentuser />

      {/* Modal to add user */}
      {/* <AddUserModal
        show={showModal}
        onHide={() => setShowModal(false)} // Close modal when done
        onAdd={handleAddUser} // Callback to handle adding user
      /> */}

    </div>
  );
};

export default User;
