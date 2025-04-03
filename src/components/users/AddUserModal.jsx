import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { registerUserAsync } from '../../features/userSlice';

const AddUserModal = ({ show, onHide }) => {
    const dispatch = useDispatch();

    const equipes = [
        { _id: '67ed6e3bff2b70c4c5583727', name: 'Equipe 1' },
        { _id: '67ed6e3bff2b70c4c5583728', name: 'Equipe 2' },
        { _id: '67ed6e3bff2b70c4c5583729', name: 'Equipe 3' },
    ];

    // Separate states for each field with new variable names
    const [usernamex, setUsernamex] = useState('');
    const [rolex, setRolex] = useState('');
    const [equipx, setEquipx] = useState('');
    const [passwordx, setPasswordx] = useState('');

    // State for error message and loading
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all required fields are filled
        if (!usernamex || !equipx || !passwordx) {
            setErrorMessage('Please fill in all required fields');
            return;
        }

        setLoading(true);

        // Dispatch registerUserAsync action to register the user
        dispatch(registerUserAsync({ username: usernamex, role: rolex, equip: equipx, password: passwordx }))
            .then(() => {
                setErrorMessage(''); // Clear any previous error messages
                setUsernamex('');
                setRolex('');
                setEquipx('');
                setPasswordx('');
                onHide(); // Close the modal
                setLoading(false);
            })
            .catch(() => {
                setErrorMessage('There was a problem registering the user.');
                setLoading(false);
            });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} autoComplete="off">
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Show error message */}

                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={usernamex}
                            onChange={(e) => setUsernamex(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            as="select"
                            value={rolex}
                            onChange={(e) => setRolex(e.target.value)}
                            className="w-100"
                        >
                            <option value="">Select Role</option>
                            <option value="agent">Agent</option>
                            <option value="supervisor">Supervisor</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Equipe</Form.Label>
                        <Form.Control
                            as="select"
                            value={equipx}
                            onChange={(e) => setEquipx(e.target.value)}
                            className="w-100"
                            required
                        >
                            <option value="">Select an Equipe</option>
                            {equipes.map((equipe) => (
                                <option key={equipe._id} value={equipe._id}>
                                    {equipe.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={passwordx}
                            onChange={(e) => setPasswordx(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Adding...' : 'Add User'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddUserModal;
