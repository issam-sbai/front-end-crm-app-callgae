import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createField, fetchAllFields } from '../../features/fieldsSlice';
import Swal from 'sweetalert2';

const AddFieldModal = ({ show, onHide }) => {
    const dispatch = useDispatch();

    const [fieldName, setFieldName] = useState('');
    const [fieldType, setFieldType] = useState('text');
    const [tableName, settableName] = useState('User');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fieldName || !fieldType || !tableName) {
            setErrorMessage('Please fill in all required fields');
            return;
        }

        setLoading(true);
        console.log({ fieldName, fieldType, tableName });

        dispatch(createField({ fieldName, fieldType, tableName }))
            .then(() => {
                setFieldName('');
                setFieldType('text');
                settableName('User');
                setErrorMessage('');
                setLoading(false);
                dispatch(fetchAllFields());
                onHide();
                Swal.fire('Field Added!', 'Dynamic field has been added successfully.', 'success');
            })
            .catch(() => {
                setErrorMessage('Error while adding field.');
                setLoading(false);
            });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Dynamic Field</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <Form.Group className="mb-3">
                        <Form.Label>Field Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter field name"
                            value={fieldName}
                            onChange={(e) => setFieldName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Field Type</Form.Label>
                        <Form.Select
                            value={fieldType}
                            onChange={(e) => setFieldType(e.target.value)}
                            required
                        >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="boolean">Boolean</option>
                            <option value="date">Date</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Target Table</Form.Label>
                        <Form.Select
                            value={tableName}
                            onChange={(e) => settableName(e.target.value)}
                            required
                        >
                            <option value="User">User</option>
                            <option value="Client">Client</option>
                            <option value="Equipe">Equipe</option>
                        </Form.Select>
                    </Form.Group>

                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Field'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddFieldModal;
