import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';  // Import js-cookie to handle cookies

import {
    getAllUsersAsync,
    deleteUserAsync,
} from '../../features/userSlice';
import {
    fetchEquipes,
    removeEquipe,
} from '../../features/equipeSlice';
import {
    fetchAllFields,
    fetchFieldsByTable
} from '../../features/fieldsSlice';

import AddUserModal from './AddUserModal';
import AddEquipeModal from './AddEquipeModal';
import AddFieldModal from './AddFieldModal';

const TableComponentuser = () => {
    const dispatch = useDispatch();

    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showAddEquipeModal, setShowAddEquipeModal] = useState(false);
    const [showAddFieldModal, setShowAddFieldModal] = useState(false);
    const [showColumnModal, setShowColumnModal] = useState(false);
    const [visibleFields, setVisibleFields] = useState([]); // Manage which fields to show

    const { users, loading: userLoading, error: userError } = useSelector((state) => state.user);
    const { equipes, loading: equipeLoading, error: equipeError } = useSelector((state) => state.equipe);
    const { fields, loading: fieldLoading, error: fieldError } = useSelector((state) => state.fields);

    useEffect(() => {
        dispatch(getAllUsersAsync());
        dispatch(fetchEquipes());
        dispatch(fetchAllFields());
        dispatch(fetchFieldsByTable('User'));

        // Load column visibility from cookies when the component mounts
        const storedColumns = Cookies.get('user-visible-columns');
        if (storedColumns) {
            setVisibleFields(JSON.parse(storedColumns));
        } else {
            // If no cookie is found, set a default visible fields (you can adjust this logic if necessary)
            setVisibleFields(['username', 'role']);  // Default visible fields (can be customized)
        }
    }, [dispatch]);

    const onDeleteUser = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUserAsync(userId))
                    .then(() => {
                        dispatch(getAllUsersAsync());
                        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
                    })
                    .catch(() => {
                        Swal.fire('Error', 'There was a problem deleting the user.', 'error');
                    });
            }
        });
    };

    const onDeleteEquipe = (equipeId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeEquipe(equipeId))
                    .then(() => {
                        dispatch(fetchEquipes());
                        Swal.fire('Deleted!', 'The equipe has been deleted.', 'success');
                    })
                    .catch(() => {
                        Swal.fire('Error', 'There was a problem deleting the equipe.', 'error');
                    });
            }
        });
    };

    const userActionTemplate = (rowData) => (
        <div className="text-center">
            <Button variant="danger" size="sm" onClick={() => onDeleteUser(rowData._id)}>
                <i className="pi pi-trash"></i>
            </Button>
        </div>
    );

    const equipeActionTemplate = (rowData) => (
        <div className="text-center">
            <Button variant="danger" size="sm" onClick={() => onDeleteEquipe(rowData._id)}>
                <i className="pi pi-trash"></i>
            </Button>
        </div>
    );

    const handleColumnVisibilityChange = (fieldName, isVisible) => {
        let updatedFields;
        if (isVisible) {
            updatedFields = [...visibleFields, fieldName];
        } else {
            updatedFields = visibleFields.filter((field) => field !== fieldName);
        }

        // Update the visibleFields state
        setVisibleFields(updatedFields);

        // Store the updated column visibility in cookies
        Cookies.set('user-visible-columns', JSON.stringify(updatedFields), { expires: 7 }); // 7 days expiration
    };

    if (userError || equipeError || fieldError) {
        return <div>Error: {userError || equipeError || fieldError}</div>;
    }

    return (
        <>
            {/* Nav Tabs */}
            <ul className="nav nav-tabs mb-3" id="userEquipeTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="equipes-tab" data-bs-toggle="tab" data-bs-target="#equipes" type="button" role="tab" aria-controls="equipes" aria-selected="true">
                        Equipes
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="users-tab" data-bs-toggle="tab" data-bs-target="#users" type="button" role="tab" aria-controls="users" aria-selected="false">
                        Users
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="fields-tab" data-bs-toggle="tab" data-bs-target="#fields" type="button" role="tab" aria-controls="fields" aria-selected="false">
                        Fields
                    </button>
                </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content" id="userEquipeTabContent">
                {/* Equipes Tab */}
                <div className="tab-pane fade show active" id="equipes" role="tabpanel" aria-labelledby="equipes-tab">
                    <div className="mb-3">
                        <Button variant="success" onClick={() => setShowAddEquipeModal(true)}>
                            <i className="pi pi-plus"></i> Add Equipe
                        </Button>
                    </div>
                    <DataTable value={equipes} paginator rows={10} stripedRows loading={equipeLoading}>
                        <Column field="name" header="Equipe Name" />
                        <Column field="description" header="Description" />
                        <Column
                            field="createdAt"
                            header="Created At"
                            body={(rowData) => new Date(rowData.createdAt).toLocaleDateString('en-CA')}
                        />
                        <Column header="Actions" body={equipeActionTemplate} />
                    </DataTable>
                </div>

                {/* Users Tab */}
                <div className="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
                    <div className="mb-3 d-flex gap-2">
                        <Button variant="success" onClick={() => setShowAddUserModal(true)}>
                            <i className="pi pi-plus"></i> Add User
                        </Button>
                        <Button variant="secondary" onClick={() => setShowColumnModal(true)}>
                            <i className="pi pi-eye"></i> Show Columns
                        </Button>
                    </div>
                    <DataTable value={users} paginator rows={10} stripedRows loading={userLoading}>
                        <Column field="username" header="User Name" />
                        <Column field="role" header="Role" />
                        <Column field="equip.name" header="Equipe" />
                        {fields
                            .filter(field => field.tableName === 'User' && visibleFields.includes(field.fieldName))
                            .map(field => (
                                <Column
                                    key={field._id}
                                    field={`dynamicFields.${field.fieldName}`}
                                    header={field.fieldName}
                                />
                            ))}
                        <Column header="Actions" body={userActionTemplate} />
                    </DataTable>
                </div>

                {/* Fields Tab */}
                <div className="tab-pane fade" id="fields" role="tabpanel" aria-labelledby="fields-tab">
                    <div className="mb-3">
                        <Button variant="primary" onClick={() => setShowAddFieldModal(true)}>
                            <i className="pi pi-plus"></i> Add Field
                        </Button>
                    </div>
                    <DataTable value={fields} paginator rows={10} stripedRows loading={fieldLoading}>
                        <Column field="fieldName" header="Field Name" />
                        <Column field="fieldType" header="Type" />
                        <Column field="tableName" header="Table" />
                        <Column
                            field="createdAt"
                            header="Created At"
                            body={(rowData) => new Date(rowData.createdAt).toLocaleDateString('en-CA')}
                        />
                    </DataTable>
                </div>
            </div>

            {/* Show Column Modal */}
            <Modal show={showColumnModal} onHide={() => setShowColumnModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Fields to Show</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {fields
                        .filter(field => field.tableName === 'User')
                        .map(field => (
                            <div key={field._id}>
                                <input
                                    type="checkbox"
                                    checked={visibleFields.includes(field.fieldName)}
                                    onChange={(e) => handleColumnVisibilityChange(field.fieldName, e.target.checked)}
                                />
                                <label className="ms-2">{field.fieldName}</label>
                            </div>
                        ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowColumnModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modals */}
            <AddUserModal users={users} show={showAddUserModal} onHide={() => setShowAddUserModal(false)} />
            <AddEquipeModal show={showAddEquipeModal} onHide={() => setShowAddEquipeModal(false)} />
            <AddFieldModal show={showAddFieldModal} onHide={() => setShowAddFieldModal(false)} />
        </>
    );
};

export default TableComponentuser;
