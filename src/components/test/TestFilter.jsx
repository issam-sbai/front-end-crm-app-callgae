import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import 'primeicons/primeicons.css';
import useClient from '../../hooks/useClient';
import { useSelector } from 'react-redux';

const options = {
    flag: [
        { value: '', label: 'Aucun(e)' },
        { value: 'PAY', label: 'PAY' },
        { value: 'STAR', label: 'STAR' },
        { value: 'PROTECT', label: 'PROTECT' },
        { value: 'CHECK', label: 'CHECK' },
        { value: 'MAP', label: 'MAP' },
        { value: 'OK', label: 'OK' },
        { value: 'TIME', label: 'TIME' },
        { value: 'MESSAGE', label: 'MESSAGE' },
        { value: 'ONE', label: 'ONE' },
        { value: 'HOME', label: 'HOME' },
        { value: 'BAN', label: 'BAN' },
        { value: 'WORK', label: 'WORK' },
        { value: 'START', label: 'START' },
        { value: 'END', label: 'END' },
        { value: 'TWO', label: 'TWO' },
        { value: 'THREE', label: 'THREE' },
        { value: 'FOUR', label: 'FOUR' },
        { value: 'PHONE', label: 'PHONE' },
        { value: '25%', label: '25%' },
        { value: '50%', label: '50%' },
        { value: 'PAY2', label: 'PAY2' },
        { value: 'GIFT', label: 'GIFT' },
        { value: 'CERTIF', label: 'CERTIF' },
        { value: 'EXPORT', label: 'EXPORT' },
        { value: 'PAY3', label: 'PAY3' },
        { value: 'PAY4', label: 'PAY4' },
        { value: 'PAY5', label: 'PAY5' },
        { value: 'PAY6', label: 'PAY6' },
        { value: 'PAY7', label: 'PAY7' },
        { value: 'PAY8', label: 'PAY8' },
        { value: 'PAY9', label: 'PAY9' },
        { value: 'PICTURE', label: 'PICTURE' },
        { value: 'EMAIL-NEW', label: 'EMAIL-NEW' },
        { value: 'EMAIL-OPEN', label: 'EMAIL-OPEN' },
    ],
    document: [
        { value: '', label: 'Aucun(e)' },
        { value: 'OK', label: 'OK' },
        { value: 'MANQUE CNI', label: 'MANQUE CNI' },
        { value: 'MANQUE TAXE FONCIERE', label: 'MANQUE TAXE FONCIERE' },
        { value: 'MANQUE AVIS', label: 'MANQUE AVIS' },
        { value: 'DOCUMENTS VALIDES', label: 'DOCUMENTS VALIDES' }
    ],
    civilite: [
        { value: '', label: 'Aucun(e)' },
        { value: 'M.', label: 'M.' },
        { value: 'Mme', label: 'Mme' },
        { value: 'Melle', label: 'Melle' }
    ],
    audit: [
        { value: '', label: 'Aucun(e)' },
        { value: 'Envoyé en VT', label: 'Envoyé en VT' },
        { value: 'VT reçu', label: 'VT reçu' },
        { value: 'Envoyé en BAO', label: 'Envoyé en BAO' },
        { value: 'BAO reçu', label: 'BAO reçu' },
        { value: 'VT à rectifier', label: 'VT à rectifier' },
        { value: 'BAO à rectifier', label: 'BAO à rectifier' }
    ],
    // typeDossier: [
    //     { value: '', label: 'Aucun(e)' },
    //     { value: 'BAT EQ 127', label: 'BAT EQ 127' },
    //     { value: 'Destratificateur', label: 'Destratificateur' },
    //     { value: 'ITE + TOITURE', label: 'ITE + TOITURE' },
    //     { value: 'RES EC 104', label: 'RES EC 104' }
    // ],
    statusChantier :[
      { value: '', label: 'Aucun(e)' },
      { value: 'NO STATUS', label: 'NO STATUS' },
      { value: 'A RAPPELER', label: 'A RAPPELER' },
      { value: 'NRP', label: 'NRP' },
      { value: 'Confirmer', label: 'Confirmer' },
      { value: 'Chantier annuler', label: 'Chantier annuler' },
      { value: 'Chantier Terminé', label: 'Chantier Terminé' },
  ],
};

const FilterComponenttest = ({ fieldsToShow = [] }) => {
  // form state
  const [prenom, setPrenom] = useState('');
  // const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [flag, setFlag] = useState(null);
  const [statusChantier, setStatusChantier] = useState(null);
  const [equipe, setEquipe] = useState(null);
  const [user, setUser] = useState(null);
  const [dateCreatedFrom, setDateCreatedFrom] = useState('');
  const [dateCreatedTo, setDateCreatedTo] = useState('');
  const [dateRdvFrom, setDateRdvFrom] = useState('');
  const [dateRdvTo, setDateRdvTo] = useState('');

  const { filterClients, getAllClients } = useClient();
  const { equipes, loading: equipeLoading } = useSelector(s => s.equipe);
  const { users, loading: userLoading, error: userError } = useSelector((state) => state.user);
  
  // helper
  const isVisible = key => fieldsToShow.includes(key);

  // build equipe options
  const equipeOptions = [{ value: '', label: 'Aucun(e)' }];
  equipes?.forEach(eq => equipeOptions.push({ value: eq._id, label: eq.name }));

  const userOptions = [{ value: '', label: 'Aucun(e)' }];
  users?.forEach(us => userOptions.push({ value: us.username, label: us.username }));

  const handleFilter = e => {
    e.preventDefault();
    const role = localStorage.getItem('role');
    const equipId = localStorage.getItem('equipId');
    const filterData = {
      prenom,
      // telephone: phone,
      department,
      flag: flag?.value || '',
      statusChantier: statusChantier?.value || '',
      dateCreatedFrom,
      dateCreatedTo,
      dateRdvFrom,
      dateRdvTo,
      equipe: equipe?.value || '',
      agentId: user?.value || '',

    };
    if (role !== 'admin' && equipId) filterData.equipe = equipId;
    filterClients(filterData);
  };

  const handleCleanFilter = () => {
    setPrenom('');
    // setPhone('');
    setDepartment('');
    setFlag(null);
    setStatusChantier(null);
    setEquipe({ value: '', label: 'Aucun(e)' });
    setUser({ value: '', label: 'Aucun(e)' });
    setDateCreatedFrom('');
    setDateCreatedTo('');
    setDateRdvFrom('');
    setDateRdvTo('');
    getAllClients();
  };

  return (
    <Form onSubmit={handleFilter}>
      <div className="row g-1">
        {isVisible('prenom') && (
          <div className="col-2">
            <Form.Control
              type="text"
              name="prenom"
              value={prenom}
              onChange={e => setPrenom(e.target.value)}
              required
              placeholder="Prénom"
              style={{ fontSize: '0.85rem', padding: '5px' }}
            />
          </div>
        )}
        {isVisible('department') && (
          <div className="col-2">
            <Form.Control
              type="text"
              value={department}
              onChange={e => setDepartment(e.target.value)}
              placeholder="Dep (Ex: 24,33,40,47,64)"
              style={{ fontSize: '0.85rem', padding: '5px' }}
            />
          </div>
        )}



        {isVisible('flag') && (
          <div className="col-2">
            <Select
              options={options.flag}
              value={flag}
              placeholder="Flag"
              onChange={setFlag}
              styles={{
                control: base => ({
                  ...base,
                  fontSize: '0.85rem',
                  padding: '0px',
                  minHeight: '33px',
                  height: '33px',
                }),
                singleValue: base => ({ ...base, fontSize: '0.85rem' }),
                option: base => ({ ...base, fontSize: '0.85rem', padding: '0px' }),
              }}
            />
          </div>
        )}

        {isVisible('statusChantier') && (
          <div className="col-2">
            <Select
              options={options.statusChantier}
              value={statusChantier}
              placeholder="Status Chantier"
              onChange={setStatusChantier}
              styles={{
                control: base => ({
                  ...base,
                  fontSize: '0.85rem',
                  padding: '0px',
                  minHeight: '33px',
                  height: '33px',
                }),
                singleValue: base => ({ ...base, fontSize: '0.85rem' }),
                option: base => ({ ...base, fontSize: '0.85rem', padding: '0px' }),
              }}
            />
          </div>
        )}
        
        {isVisible('agent') && (
          <div className="col-2">
            <Select
              options={userOptions}
              value={userOptions.find(opt => opt.value === user?.value)}
              onChange={setUser}
              placeholder="Agent"
              isLoading={userLoading}
              styles={{
                control: base => ({
                  ...base,
                  fontSize: '0.75rem',
                  padding: '0px 0px',
                  minHeight: '33px',
                  height: '33px',
                }),
                singleValue: base => ({ ...base, fontSize: '0.75rem' }),
                option: base => ({ ...base, fontSize: '0.75rem', padding: '0px' }),
              }}
            />
          </div>
        )}


        {isVisible('equipe') && (
          <div className="col-2">
            <Select
              options={equipeOptions}
              value={equipeOptions.find(opt => opt.value === equipe?.value)}
              onChange={setEquipe}
              placeholder="Équipe"
              isLoading={equipeLoading}
              styles={{
                control: base => ({
                  ...base,
                  fontSize: '0.75rem',
                  padding: '0px 0px',
                  minHeight: '33px',
                  height: '33px',
                }),
                singleValue: base => ({ ...base, fontSize: '0.75rem' }),
                option: base => ({ ...base, fontSize: '0.75rem', padding: '0px' }),
              }}
            />
          </div>
        )}

        {isVisible('dateCreated') && (
          <div className="col-2" title="Sélectionnez la date de création">
            <div className="input-group d-flex align-items-center">
              <label className="input-group-text" htmlFor="dateCreatedFrom"
                style={{ maxWidth: '14%', height: '33px' }}>
                <i className="pi pi-calendar" style={{ color: '#666' }}></i>
              </label>
              <div style={{ maxWidth: '43%' }}>
                <input
                  type="date"
                  id="dateCreatedFrom"
                  value={dateCreatedFrom}
                  onChange={e => setDateCreatedFrom(e.target.value)}
                  className="form-control"
                  style={{ fontSize: '0.75rem', height: '33px', padding: '0 5px', borderRadius: 0 }}
                />
              </div>
              <div style={{ maxWidth: '43%' }}>
                <input
                  type="date"
                  id="dateCreatedTo"
                  value={dateCreatedTo}
                  onChange={e => setDateCreatedTo(e.target.value)}
                  className="form-control"
                  style={{ fontSize: '0.75rem', height: '33px', padding: '0 5px', borderRadius: 0 }}
                />
              </div>
            </div>
          </div>
        )}

        {isVisible('dateRdv') && (
          <div className="col-2" title="Sélectionnez la date de RDV">
            <div className="input-group d-flex align-items-center justify-content-between">
              <label className="input-group-text" htmlFor="dateRdvFrom"
                style={{ maxWidth: '14%', height: '33px' }}>
                <i className="pi pi-calendar" style={{ color: '#666' }}></i>
              </label>
              <div style={{ maxWidth: '43%' }}>
                <input
                  type="date"
                  id="dateRdvFrom"
                  value={dateRdvFrom}
                  onChange={e => setDateRdvFrom(e.target.value)}
                  className="form-control"
                  style={{ fontSize: '0.75rem', height: '33px', padding: '0 5px', borderRadius: 0 }}
                />
              </div>
              <div style={{ maxWidth: '43%' }}>
                <input
                  type="date"
                  id="dateRdvTo"
                  value={dateRdvTo}
                  onChange={e => setDateRdvTo(e.target.value)}
                  className="form-control"
                  style={{ fontSize: '0.75rem', height: '33px', padding: '0 5px', borderRadius: 0 }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="col-2">
          <div className="d-flex">
            <Button
              variant="success"
              type="submit"
              onClick={handleFilter}
              style={{ fontSize: '0.75rem', padding: '3px 8px' }}
            >
              Appliquer
            </Button>
            <Button
              variant="warning"
              onClick={handleCleanFilter}
              className="mx-1"
              style={{ fontSize: '0.75rem', padding: '3px 8px' }}
            >
              Réinitialiser
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default FilterComponenttest;
