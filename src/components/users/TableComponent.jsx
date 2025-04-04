import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import Swal from 'sweetalert2';

import { getAllUsersAsync, deleteUserAsync } from '../../features/userSlice';
import { fetchEquipes, removeEquipe } from '../../features/equipeSlice'; // Import the actions from equipe slice
import AddUserModal from './AddUserModal';
import AddEquipeModal from './AddEquipeModal'; // Import the AddEquipeModal

const TableComponentuser = () => {
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showAddEquipeModal, setShowAddEquipeModal] = useState(false); // State for AddEquipeModal
    const dispatch = useDispatch();
    const { users, loading: userLoading, error: userError } = useSelector((state) => state.user);
    const { equipes, loading: equipeLoading, error: equipeError } = useSelector((state) => state.equipe);

    useEffect(() => {
        dispatch(getAllUsersAsync());
        dispatch(fetchEquipes()); // Fetch the equipes on component mount
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
                dispatch(deleteUserAsync(userId)) // Dispatch delete action
                    .then(() => {
                        // Re-fetch the users after deletion to refresh the list
                        dispatch(getAllUsersAsync());
                        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
                    })
                    .catch((error) => {
                        // Handle error if needed
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
                console.log(equipeId);
                dispatch(removeEquipe(equipeId)) // Dispatch removeEquipe action
                    .then(() => {
                        // Re-fetch the equipes after deletion to refresh the list
                        dispatch(fetchEquipes());
                        Swal.fire('Deleted!', 'The equipe has been deleted.', 'success');
                    })
                    .catch((error) => {
                        Swal.fire('Error', 'There was a problem deleting the equipe.', 'error');
                    });
            }
        });
    };

    const handleAddUser = (user) => {
        // Add the user to the state or handle post-submission logic here
        console.log('User added:', user);
        setShowAddUserModal(false); // Close the modal after user is added
    };

    // Action Buttons Column for Users
    const userActionTemplate = (rowData) => (
        <div className="text-center">
            <Button variant="danger" size="sm" onClick={() => onDeleteUser(rowData._id)}>
                <i className="pi pi-trash"></i>
            </Button>
        </div>
    );

    // Action Buttons Column for Equipes
    const equipeActionTemplate = (rowData) => (
        <div className="text-center">
            <Button variant="danger" size="sm" onClick={() => onDeleteEquipe(rowData._id)}>
                <i className="pi pi-trash"></i>
            </Button>
        </div>
    );

    if (userError || equipeError) {
        return <div>Error: {userError || equipeError}</div>;
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
    </ul>

    {/* Tab Content */}
    <div className="tab-content" id="userEquipeTabContent">
        {/* Equipes Tab */}
        <div className="tab-pane fade show active" id="equipes" role="tabpanel" aria-labelledby="equipes-tab">
            <div className="mb-3">
                <Button variant="success" onClick={() => setShowAddEquipeModal(true)}>
                    <i className="pi pi-plus "></i> Add Equipe
                </Button>
            </div>

            <DataTable
                stripedRows
                value={equipes}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                size="small"
                tableStyle={{ minWidth: '100%' }}
                loading={equipeLoading}
            >
                <Column field="name" header="Equipe Name" />
                <Column field="description" header="Description" />
                <Column
                    field="createdAt"
                    header="Created At"
                    body={(rowData) => new Date(rowData.createdAt).toLocaleDateString('en-CA')}
                />
                <Column header="Actions" body={equipeActionTemplate} style={{ textAlign: 'center' }} />
            </DataTable>
        </div>

        {/* Users Tab */}
        <div className="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
            <div className="mb-3">
                <Button variant="success" onClick={() => setShowAddUserModal(true)}>
                    <i className="pi pi-plus "></i> Add User
                </Button>
            </div>

            <DataTable
                stripedRows
                value={users}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                size="small"
                tableStyle={{ minWidth: '100%' }}
                loading={userLoading}
            >
                <Column field="username" header="User Name" />
                <Column field="role" header="Role" />
                <Column field="equip.name" header="Equipe" />
                <Column header="Actions" body={userActionTemplate} style={{ textAlign: 'center' }} />
            </DataTable>
        </div>
    </div>

    {/* Add User Modal */}
    <AddUserModal users={users} show={showAddUserModal} onHide={() => setShowAddUserModal(false)} />

    {/* Add Equipe Modal */}
    <AddEquipeModal show={showAddEquipeModal} onHide={() => setShowAddEquipeModal(false)} />
</>
    );
};

export default TableComponentuser;
