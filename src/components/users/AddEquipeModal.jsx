import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addEquipe, fetchEquipes } from '../../features/equipeSlice';  // Make sure you have an action for adding equipe
import Swal from 'sweetalert2';

const AddEquipeModal = ({ show, onHide }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description) {
            setErrorMessage('Please fill in all required fields');
            return;
        }

        setLoading(true);

        // Dispatch the action to add a new equipe
        dispatch(addEquipe({ name, description }))
            .then(() => {
                setErrorMessage(''); // Clear error message
                setName('');
                setDescription('');
                onHide(); // Close the modal
                setLoading(false);
                dispatch(fetchEquipes())
                // Show success message
                Swal.fire('Equipe Added!', 'The equipe has been added successfully.', 'success');
            })
            .catch(() => {
                setErrorMessage('There was a problem adding the equipe.');
                setLoading(false);
            });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Equipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} autoComplete="off">
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <Form.Group className="mb-3" controlId="formEquipeName">
                        <Form.Label>Equipe Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Equipe name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEquipeDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Equipe'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEquipeModal;
