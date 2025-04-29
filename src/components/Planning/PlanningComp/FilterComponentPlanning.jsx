import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'primeicons/primeicons.css'; // Import PrimeIcons

const options = {
  flag: [
    { value: 'Aucun(e)', label: 'Aucun(e)' },
    { value: 'OK', label: 'OK' },
    { value: 'MANQUE CNI', label: 'MANQUE CNI' },
    { value: 'MANQUE TAXE FONCIERE', label: 'MANQUE TAXE FONCIERE' },
    { value: 'MANQUE AVIS', label: 'MANQUE AVIS' },
    { value: 'DOCUMENTS VALIDES', label: 'DOCUMENTS VALIDES' }
  ],
  civilite: [
    { value: 'M.', label: 'M.' },
    { value: 'Mme', label: 'Mme' },
    { value: 'Melle', label: 'Melle' }
  ],

  statusChantier: [
    { value: 'A RAPPELER', label: 'A RAPPELER' },
    { value: 'NRP', label: 'NRP' },
    { value: 'INJOIGNABLE', label: 'INJOIGNABLE' },
    { value: 'A RETRAITER', label: 'A RETRAITER' },
    { value: 'CONFIRMER RÉGIE', label: 'CONFIRMER RÉGIE' }
  ]
};

const FilterComponent = ({ onApplyFilter }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [prenom, setPrenom] = useState('');
  const [agentId, setAgentId] = useState('');
  const [civilite, setCivilite] = useState(null);
  const [flag, setFlag] = useState(null);
  const [statusChantier, setStatusChantier] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleFilter = () => {
    const filterData = {
      nomPrenom: name,
      telephone: phone,
      codePostal,
      prenom,
      agentId,
      civilite: civilite?.value || '',
      flag: flag?.value || '',
      statusChantier: statusChantier?.value || '',
      startDate: startDate ? startDate.toISOString().split('T')[0] : '',
      endDate: endDate ? endDate.toISOString().split('T')[0] : ''
    };
    onApplyFilter(filterData);
  };

  const handleCleanFilter = () => {
    setName('');
    setPhone('');
    setCodePostal('');
    setPrenom('');
    setAgentId('');
    setCivilite(null);
    setFlag(null);
    setStatusChantier(null);
    setDateRange([null, null]);
    onApplyFilter({});
  };

  return (
    <div>
      <Form>
        <div className="row g-1">
          <div className="col-2">
            <Select options={options.civilite} value={civilite} placeholder="Civilité" onChange={setCivilite} />
          </div>
          <div className="col-2">
            <Select options={options.flag} value={flag} placeholder="Flag" onChange={setFlag} />
          </div>
          <div className="col-2">
            <Select options={options.statusChantier} value={statusChantier} placeholder="Status Chantier" onChange={setStatusChantier} />
          </div>

          <div className="col-2">
            <Form.Control
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Téléphone"
            />
          </div>
          <div className="col-2">
            <Form.Control
              type="number"
              name="codePostal"
              value={codePostal}
              onChange={(e) => setCodePostal(e.target.value)}
              required
              placeholder="Code Postal"
            />
          </div>
          <div className="col-2">
            <Form.Control
              type="text"
              name="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
              placeholder="Prénom"
            />
          </div>


          <div className="col-2">
            <Select options={options.civilite} value={civilite} placeholder="add selcet her" onChange={setCivilite} />
          </div>
          <div className="col-2">
            <Select options={options.civilite} value={civilite} placeholder="add selcet he" onChange={setCivilite} />
          </div>

          <div className="col-2">
            <Button variant="success" onClick={handleFilter}>Appliquer</Button>
            <Button variant="warning" onClick={handleCleanFilter} className="mx-1">Réinitialiser</Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FilterComponent;
