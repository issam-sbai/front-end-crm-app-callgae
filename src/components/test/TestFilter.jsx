import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import 'primeicons/primeicons.css';
import useClient from '../../hooks/useClient';
import { useSelector } from 'react-redux';

const options = {
  typeRdv: [
    { value: '', label: 'Aucun(e)' },
    { value: 'Extérieur', label: 'Extérieur' },
    { value: 'Intérieur', label: 'Intérieur' }
  ],
  civilite: [
    { value: '', label: 'Aucun(e)' },
    { value: 'M.', label: 'M.' },
    { value: 'Mme', label: 'Mme' },
    { value: 'Melle', label: 'Melle' }
  ],

  flag: [
    { value: '', label: 'Aucun(e)' },
    { value: 'PAY', label: 'PAY' },
    { value: 'NO PAY', label: 'NO PAY' }
  ],

  statusChantier: [
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
  const [typeRdv, setTypeRdv] = useState(null);
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
      typeRdv: typeRdv?.value || '',
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
    setTypeRdv(null);
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
      <div className="d-flex flex-wrap g-1" style={{ width: '100%', flexWrap: 'nowrap' }}>
        {isVisible('prenom') && (
          <div className="flex-item" style={{ flex: '1 1 auto', marginRight: '5px' }}>
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
          <div className="flex-item ml-1" style={{ flex: '1 1 auto', marginRight: '5px' }}>
            <Form.Control
              type="text"
              value={department}
              onChange={e => setDepartment(e.target.value)}
              placeholder="Dep (Ex: 24,33,40,47,64)"
              style={{ fontSize: '0.85rem', padding: '5px' }}
            />
          </div>
        )}
        {isVisible('equipe') && (
          <div className="flex-item " style={{ flex: '1 1 auto', marginRight: '5px' }}>
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

        {isVisible('agent') && (
          <div className="flex-item" style={{ flex: '1 1 auto', marginRight: '5px' }}>
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
        {isVisible('statusChantier') && (
          <div className="flex-item" style={{ flex: '1 1 auto' }}>
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
      </div>

      <div className="d-flex flex-wrap mt-2" style={{ width: '100%', flexWrap: 'nowrap' }}>
        {isVisible('typeRdv') && (
          <div style={{ flex: '1 1 auto', marginRight: '10px' }}>
            <Select
              options={options.typeRdv}
              value={typeRdv}
              placeholder="typeRdv"
              onChange={setTypeRdv}
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

        {isVisible('flag') && (
          <div style={{ flex: '1 1 auto', marginRight: '10px' }}>
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
        {isVisible('dateCreated') && (
          <div style={{ flex: '1 1 auto', marginRight: '10px' }} title="Sélectionnez la date de création">
            <div className="input-group d-flex align-items-center">
              <label className="input-group-text" htmlFor="dateCreatedFrom" style={{ height: '33px' }}>
                <i className="pi pi-calendar" style={{ color: '#666' }}></i>
              </label>
              <input
                type="date"
                id="dateCreatedFrom"
                value={dateCreatedFrom}
                onChange={e => setDateCreatedFrom(e.target.value)}
                className="form-control"
                style={{ fontSize: '0.75rem', height: '33px', padding: '0 5px', borderRadius: 0 }}
              />
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
        )}
        {isVisible('dateRdv') && (
          <div style={{ flex: '1 1 auto', marginRight: '10px' }} title="Sélectionnez la date de RDV">
            <div className="input-group d-flex align-items-center">
              <label className="input-group-text" htmlFor="dateRdvFrom" style={{ height: '33px' }}>
                <i className="pi pi-calendar-clock" style={{ color: 'var(--primary-color)' }}></i>
              </label>
              <input
                type="date"
                id="dateRdvFrom"
                value={dateRdvFrom}
                onChange={e => setDateRdvFrom(e.target.value)}
                className="form-control"
                style={{ fontSize: '0.75rem', height: '33px', padding: '0 5px', borderRadius: 0 }}
              />
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
        )}
        <div style={{ flex: '0 0 auto' }}>
          <div className="d-flex">
            <Button
              variant="success"
              type="submit"
              onClick={handleFilter}
              style={{ fontSize: '0.75rem', padding: '3px 8px', marginRight: '5px' }}
            >
              Appliquer
            </Button>
            <Button
              variant="warning"
              onClick={handleCleanFilter}
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
