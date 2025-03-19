import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

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
  const [dateRdv, setDateRdv] = useState(''); // Added state for dateRdv

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
      dateRdv, // Including dateRdv in the filter data
    };

    // Apply filter by sending the filter data to the parent component (ClientComponent)
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
    setDateRdv(''); // Reset the dateRdv field

    // Optionally, reset the filtered clients in the parent component as well
    onApplyFilter({});
  };

  return (
    <div className="mb-3">
      <Card className="p-3">
        <Form>
          <div className="d-flex flex-wrap gap-4">
            <div className="flex-fill">
              <Form.Control
                type="text"
                placeholder="Filter by Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex-fill">
              <Form.Control
                type="text"
                placeholder="Filter by Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex-fill">
              <Form.Control
                type="text"
                placeholder="Filter by Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex-fill">
              <Form.Control
                type="text"
                placeholder="Filter by Agent ID"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
              />
            </div>
            <div className="flex-fill">
              <Form.Control
                type="text"
                placeholder="Filter by Civilité"
                value={civilite}
                onChange={(e) => setCivilite(e.target.value)}
              />
            </div>
            <div className="flex-fill">
              <Form.Control
                type="text"
                placeholder="Filter by Entreprise"
                value={entreprise}
                onChange={(e) => setEntreprise(e.target.value)}
              />
            </div>
            <div className="flex-fill">
              <Form.Control
                type="text"
                placeholder="Filter by CP"
                value={cp}
                onChange={(e) => setCp(e.target.value)}
              />
            </div>
            <div className="flex-fill">
              <Form.Control
                as="select"
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
              >
                <option value="">Filter by Statut</option>
                <option value="Non statué">Non statué</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Installation">Installation</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Control>
            </div>
            <div className="flex-fill">
              <Form.Control
                as="select"
                value={typeRdv}
                onChange={(e) => setTypeRdv(e.target.value)}
              >
                <option value="">Filter by Type RDV</option>
                <option value="Intérieur">Intérieur</option>
                <option value="Extérieur">Extérieur</option>
              </Form.Control>
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
