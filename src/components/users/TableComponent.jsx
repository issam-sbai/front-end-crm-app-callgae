import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import Swal from 'sweetalert2';

import { getAllUsersAsync, updateUserAsync, deleteUserAsync } from '../../features/userSlice';
import AddUserModal from './AddUserModal';

const TableComponentuser = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllUsersAsync());
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

    const handleAddUser = (user) => {
        // Add the user to the state or handle post-submission logic here
        console.log('User added:', user);
        setShowModal(false); // Close the modal after user is added
    };

    // Action Buttons Column
    const actionTemplate = (rowData) => (
        <div className="text-center">
            <Button variant="danger" size="sm" onClick={() => onDeleteUser(rowData._id)}>
                <i className="pi pi-trash"></i>
            </Button>
        </div>
    );

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>

            <div className="d-flex justify-content-between mb-3 px-4">
                <br />
                <div className="px-2 mt-2 flex-grow-1">
                    <div className=" mb-3">
                        <Button variant="success" onClick={() => setShowModal(true)}>
                            <i className="pi pi-plus "></i> Add Equipe
                        </Button>
                    </div>

                    <DataTable
                        stripedRows
                        value={users}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        size="small"
                        tableStyle={{ minWidth: '100%' }}
                        loading={loading}
                    >
                        <Column field="username" header="Equipe Name" />
                        <Column field="role" header="description" />
                        <Column field="equip.name" header="createdAt" />
                        <Column header="Actions" body={actionTemplate} style={{ textAlign: 'center' }} />
                    </DataTable>
                </div>
                <div className="px-2 mt-2 flex-grow-1">
                    <div className=" mb-3">
                        <Button variant="success" onClick={() => setShowModal(true)}>
                            <i className="pi pi-plus "></i> Add User
                        </Button>
                    </div>

                    <DataTable
                        stripedRows
                        value={users}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        size="small"
                        tableStyle={{ minWidth: '100%' }}
                        loading={loading}
                    >
                        <Column field="username" header="User Name" />
                        <Column field="role" header="Role" />
                        <Column field="equip.name" header="Equipe" />
                        <Column header="Actions" body={actionTemplate} style={{ textAlign: 'center' }} />
                    </DataTable>
                </div>
            </div>


            <AddUserModal users = {users} show={showModal} onHide={() => setShowModal(false)} />
        </>
        // Callback to handle adding user onAdd={handleAddUser}
    );
};

export default TableComponentuser;
