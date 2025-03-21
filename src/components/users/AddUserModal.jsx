import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const AddUserModal = ({ show, onHide, onAdd }) => {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'User',
        isActive: true,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const validateForm = () => {
        // Check required fields
        const requiredFields = ['name', 'email', 'password'];
        for (let field of requiredFields) {
            if (!newUser[field]) {
                return `${field} is required`;
            }
        }
        return ''; // No error
    };

    const handleSubmit = async () => {
        // Validate the form before submission
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            // Submit the form data to the API
            await axios.post("http://localhost:5000/api/user/register", newUser);
            setSuccess("User added successfully!");
            setError('');
            onAdd(newUser); // Call the parent component's callback
            setNewUser({ name: '', email: '', password: '', role: 'User', isActive: true }); // Reset the form
            onHide(); // Close the modal after adding
        } catch (err) {
            setError("Failed to add user. Please try again.");
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form>
                    {/* Name */}
                    <Form.Group className="mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={newUser.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Role */}
                    <Form.Group className="mb-4">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            as="select"
                            name="role"
                            value={newUser.role}
                            onChange={handleChange}
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Active Status */}
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            label="Active"
                            name="isActive"
                            checked={newUser.isActive}
                            onChange={() => setNewUser({ ...newUser, isActive: !newUser.isActive })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Add User</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddUserModal;
