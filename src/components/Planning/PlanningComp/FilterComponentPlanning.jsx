import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import Select from 'react-select';

const FilterComponent = ({ onApplyFilter }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agentId, setAgentId] = useState('');
  const [civilite, setCivilite] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [cp, setCp] = useState('');
  const [statut, setStatut] = useState('');
  const [typeRdv, setTypeRdv] = useState('');
  const [dateRdv, setDateRdv] = useState('');

  const handleFilter = () => {
    // Collect the filter data
    const filterData = {
      nomPrenom: name,
      telephone: phone,
      adresse: address,
      agentId,
      civilite,
      entreprise,
      cp,
      statut,
      typeRdv,
      dateRdv,
    };

    // Apply filter by sending the filter data to the parent component
    onApplyFilter(filterData);
  };

  const handleCleanFilter = () => {
    // Reset all filter fields to their initial state
    setName('');
    setPhone('');
    setAddress('');
    setAgentId('');
    setCivilite('');
    setEntreprise('');
    setCp('');
    setStatut('');
    setTypeRdv('');
    setDateRdv('');

    // Optionally, reset the filtered clients in the parent component as well
    onApplyFilter({});
  };

  // Custom options for the statut field with colors
  const statutOptions = [
    { value: 'Non statué', label: 'Non statué', color: '#808080' },
    { value: 'Confirmed', label: 'Confirmed', color: '#26ba12' },
    { value: 'Installation', label: 'Installation', color: '#0000ff' },
    { value: 'Cancelled', label: 'Cancelled', color: '#ff0000' }
  ];

  // Custom options for the type RDV with colors
  const typeRdvOptions = [
    { value: 'Intérieur', label: 'Intérieur', color: '#FFA07A' },  // Red for Intérieur
    { value: 'Extérieur', label: 'Extérieur', color: '#FFD700' }  // Blue for Extérieur
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
    <div className="mb-3">
      <Card className="p-3">
        <Form>
          <div className="d-flex flex-wrap gap-4">
            <div className="flex-fill">
              <Select
                options={statutOptions}
                value={statutOptions.find(option => option.value === statut)}
                onChange={(selectedOption) => setStatut(selectedOption.value)}
                getOptionLabel={(e) => (
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        backgroundColor: e.color,
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        marginRight: '8px',
                      }}
                    />
                    <span>{e.label}</span>
                  </div>
                )}
                placeholder="Filter by Statut"
                styles={customStyles}
              />
            </div>
            <div className="flex-fill">
              <Select
                options={typeRdvOptions}
                value={typeRdvOptions.find(option => option.value === typeRdv)}
                onChange={(selectedOption) => setTypeRdv(selectedOption.value)}
                getOptionLabel={(e) => (
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        backgroundColor: e.color,
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        marginRight: '8px',
                      }}
                    />
                    <span>{e.label}</span>
                  </div>
                )}
                placeholder="Filter by Type RDV"
                styles={customStyles}
              />
            </div>
            <div className="flex-fill">
              <Form.Control
                type="date"
                placeholder="Filter by Date RDV"
                value={dateRdv}
                onChange={(e) => setDateRdv(e.target.value)} // Handling date input change
              />
            </div>
            <Button variant="btn btn-success mb-3" onClick={handleFilter}> 
              Apply Filter
            </Button>
            <button className="btn btn-warning mb-3" onClick={handleCleanFilter}> 
              Clean Filter
            </button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default FilterComponent;
