import React from 'react';
import { Button } from 'react-bootstrap';
import 'primeicons/primeicons.css';
import './fil.css'; // Import the common styles

const TableComponent = ({ users, onUpdateUser, onDeleteUser }) => {
    return (
        <div className="px-4 mt-4 user-container">
            <div className="table-responsive">
                <table className="table table-bordered table-sm">
                    <thead>
                        <tr className="text-center">
                            <th><i className="pi pi-user"></i> Name</th>
                            <th><i className="pi pi-envelope"></i> Email</th>
                            <th><i className="pi pi-shield"></i> Role</th>
                            <th><i className="pi pi-check-circle"></i> Active</th>
                            <th style={{ textAlign: 'right' }}><i className="pi pi-cog"></i> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id || index} className="text-center">
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.isActive ? 'Yes' : 'No'}</td>
                                <td className="text-end">
                                    <Button 
                                        variant="warning" 
                                        size="sm" 
                                        onClick={() => onUpdateUser(user)} 
                                        className="me-2"
                                    >
                                        <i className="pi pi-pencil"></i>
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        size="sm" 
                                        onClick={() => onDeleteUser(user._id)}
                                    >
                                        <i className="pi pi-trash"></i> 
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableComponent;
