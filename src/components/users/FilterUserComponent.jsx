import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import Select from 'react-select';

const FilterUserComponent = ({ onApplyFilter }) => {
    const [agentId, setAgentId] = useState('');
    const [nom, setNom] = useState('');
    const [active, setActive] = useState(null); // null: no filter, true: active, false: inactive
    const [role, setRole] = useState('');

    const handleFilter = () => {
        // Collect the filter data
        const filterData = {
            agentId,
            nom,
            active,
            role,
        };

        // Apply filter by sending the filter data to the parent component
        onApplyFilter(filterData);
    };

    const handleCleanFilter = () => {
        // Reset all filter fields to their initial state
        setAgentId('');
        setNom('');
        setActive(null);
        setRole('');

        // Optionally, reset the filtered users in the parent component as well
        onApplyFilter({});
    };

    // Options for role
    const roleOptions = [
        { value: 'User', label: 'User' },
        { value: 'Admin', label: 'Admin' },
    ];

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#D3D3D3' : 'white',
            color: state.isSelected ? 'black' : 'black',
            padding: 10,
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black',
        }),
        menu: (provided) => ({
            ...provided,
            width: '100%',
        }),
    };

    return (
        <div className="mb-3 px-4">
            <Card className="p-3">
                <Form>
                    <div className="d-flex flex-wrap gap-4">
                        {/* AgentID */}
                        <div className="flex-fill">
                            <Form.Control
                                type="text"
                                placeholder="Filter by Agent ID"
                                value={agentId}
                                onChange={(e) => setAgentId(e.target.value)}
                            />
                        </div>

                        {/* Nom */}
                        <div className="flex-fill">
                            <Form.Control
                                type="text"
                                placeholder="Filter by Nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                        </div>

                        {/* Active Status */}
                        <div className="flex-fill">
                            <Select
                                options={[
                                    { value: null, label: 'All' },
                                    { value: true, label: 'Active' },
                                    { value: false, label: 'Inactive' },
                                ]}
                                value={
                                    active === null
                                        ? { value: null, label: 'All' }
                                        : { value: active, label: active ? 'Active' : 'Inactive' }
                                }
                                onChange={(selectedOption) => setActive(selectedOption.value)}
                                placeholder="Filter by Active"
                                styles={customStyles}
                            />
                        </div>

                        {/* Role */}
                        <div className="flex-fill">
                            <Select
                                options={roleOptions}
                                value={roleOptions.find(option => option.value === role)}
                                onChange={(selectedOption) => setRole(selectedOption.value)}
                                placeholder="Filter by Role"
                                styles={customStyles}
                            />
                        </div>
                        <div className="flex-fill">
                            <Button variant="success mx-3" onClick={handleFilter}>
                                Apply Filter
                            </Button>
                            <button className="btn btn-warning mx-3" onClick={handleCleanFilter}>
                                Clean Filter
                            </button>
                        </div>
                    

                    </div>

                    {/* Apply and Clean Filter Buttons */}


                </Form>
            </Card>
        </div>
    );
};

export default FilterUserComponent;
