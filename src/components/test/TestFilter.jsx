import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import 'primeicons/primeicons.css'; // Import PrimeIcons
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { format } from "date-fns";
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
    typeDossier: [
        { value: '', label: 'Aucun(e)' },
        { value: '145', label: '145' },
        { value: 'AMPLEUR', label: 'AMPLEUR' },
        { value: 'Destratificateur', label: 'Destratificateur' },
        { value: 'ITE', label: 'ITE' },
        { value: 'ITE + TOITURE', label: 'ITE + TOITURE' },
        { value: 'LED', label: 'LED' },
        { value: 'LED INTERIEUR', label: 'LED INTERIEUR' },
        { value: 'Réno - ISO', label: 'Réno - ISO' },
        { value: 'Réno - ITE', label: 'Réno - ITE' },
        { value: 'Réno - PAC', label: 'Réno - PAC' },
        { value: 'Réno - PLACO', label: 'Réno - PLACO' }
    ],

    statusChantier: [
        { value: '', label: 'Aucun(e)' },
        { value: 'NO STATUS', label: 'NO STATUS' },
        { value: 'A RAPPELER', label: 'A RAPPELER' },
        { value: 'NRP', label: 'NRP' },
        { value: 'INJOIGNABLE', label: 'INJOIGNABLE' },
        { value: 'A RETRAITER', label: 'A RETRAITER' },
        { value: 'CONFIRMER RÉGIE', label: 'CONFIRMER RÉGIE' },
        { value: 'LEDS SOLAIRES', label: 'LEDS SOLAIRES' },
        { value: 'Confirmer', label: 'Confirmer' },
        { value: 'Chantier annuler', label: 'Chantier annuler' },
        { value: 'SAV', label: 'SAV' },
        { value: 'RENVOYER EQUIPE SUR PLACE', label: 'RENVOYER EQUIPE SUR PLACE' },
        { value: 'RETOURNER RECUPERER LEDS', label: 'RETOURNER RECUPERER LEDS' },
        { value: 'MANQUE PIÈCES', label: 'MANQUE PIÈCES' },
        { value: 'LIVRAISON POSTALE', label: 'LIVRAISON POSTALE' },
        { value: 'Chantier Terminé', label: 'Chantier Terminé' },
        { value: 'MANQUES RÉGLETTES', label: 'MANQUES RÉGLETTES' },
        { value: 'MPR', label: 'MPR' }
    ],
    equipe: [
        { value: '', label: 'Aucun(e)' },
        { value: '67ed6e1cff2b70c4c5583724', label: 'EQUIPE 1' },
        { value: '67ed6e3bff2b70c4c5583727', label: 'EQUIPE 2' },
        { value: '67ee50102c2321b1acbfa187', label: 'EQUIPE 3' },
    ]
};

const formatDate = (dateObj) => {
    if (dateObj && dateObj.date) {
        const { date } = dateObj; // Safe destructuring after checking for null
        return date.toISOString().split('T')[0];
        // format and return date as needed
    } else {
        return null; // or default value if date is unavailable
    }
};


const FilterComponenttest = () => {

    const [dateCreatedFrom, setDateCreatedFrom] = useState(null);
    const [dateCreatedTo, setDateCreatedTo] = useState(null);
    const [dateRdvFrom, setDateRdvFrom] = useState(null);
    const [dateRdvTo, setDateRdvTo] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    // const [codePostal, setCodePostal] = useState('');
    const [prenom, setPrenom] = useState('');
    const [agentId, setAgentId] = useState('');
    const [equipe, setEquipe] = useState(null);
    const [audit, setAudit] = useState(null);
    const [typeDossier, setTypeDossier] = useState(null);
    const [document, setDocument] = useState(null);
    const [flag, setFlag] = useState(null);
    const [statusChantier, setStatusChantier] = useState(null);
    const [department, setDepartment] = useState('');
    const { filterClients } = useClient();
    const { getAllClients } = useClient();
 
    const { equipes, loading: equipeLoading, error: equipeError } = useSelector((state) => state.equipe);
    const handleFilter = async (event) => {
        event.preventDefault();
        console.log(equipes);
        
        console.log("Filter function executed, event prevented!");
        const filterData = {
            nomPrenom: name,
            telephone: phone,
            department,
            // codePostal,
            prenom,
            agentId,
            audit: audit?.value || '',
            typeDossier: typeDossier?.value || '',
            document: document?.value || '',
            flag: flag?.value || '',
            statusChantier: statusChantier?.value || '',
            dateCreatedFrom: dateCreatedFrom,
            dateCreatedTo: dateCreatedTo,
            dateRdvFrom: dateRdvFrom,
            dateRdvTo: dateRdvTo,
            equipe:equipe?.value || ''

        };

        try {
            filterClients(filterData)
            // console.log(filterData)
        } catch (error) {
            console.error('Error fetching filtered clients', error);
        }
    };

    const handleCleanFilter = () => {
        setName('');
        setPhone('');
        setDepartment('');
        setPrenom('');
        setAgentId('');
        setAudit(null);
        setTypeDossier(null);
        setDocument(null);
        setFlag(null);
        setStatusChantier(null);
        setDateCreatedFrom(null);
        setDateCreatedTo(null);
        setDateRdvFrom(null);
        setDateRdvTo(null);
        setEquipe({ value: '', label: 'Aucun(e)' });  // Reset the equipe select to default
        getAllClients()
    };

    const equipeOptions = [{ value: '', label: 'Aucun(e)' }];
    if (equipes && equipes.length > 0) {
        equipes.forEach(eq => {
            equipeOptions.push({ value: eq._id, label: eq.name });
        });
    }
    

    return (
        <div>
            <Form onSubmit={handleFilter}>
                <div className="row g-1">
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
                        <Form.Control
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            placeholder="Téléphone"
                        />
                    </div>
                    {/* <div className="col-2">
                        <Form.Control
                            type="text"
                            name="codePostal"
                            value={codePostal}
                            onChange={(e) => setCodePostal(e.target.value)}
                            required
                            placeholder="Code Postal"
                        />
                    </div> */}
                    <div className="col-2">
                        <Form.Control
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)} // Update department state
                            placeholder="Dep (Ex: 24,33,40,47,64)"
                        />
                    </div>
                    {/* <div className="col-2">
                        <Select options={options.civilite} value={civilite} placeholder="Civilité" onChange={setCivilite} />
                    </div> */}
                    <div className="col-2">
                        <Select options={options.audit} value={audit} placeholder="Audit" onChange={setAudit} />
                    </div>
                    <div className="col-2">
                        <Select options={options.typeDossier} value={typeDossier} placeholder="Type Dossier" onChange={setTypeDossier} />
                    </div>
                    <div className="col-2">
                        <Select options={options.document} value={document} placeholder="Document" onChange={setDocument} />
                    </div>
                    <div className="col-2">
                        <Select options={options.flag} value={flag} placeholder="Flag" onChange={setFlag} />
                    </div>
                    <div className="col-2">
                        <Select options={options.statusChantier} value={statusChantier} placeholder="Status Chantier" onChange={setStatusChantier} />
                    </div>


                    {/* date */}
                    <div className="col-2">
                        <div className="input-group d-flex">
                            <label style={{ maxWidth: '14%' }} className="input-group-text" htmlFor="id_flt_clients_rdv_1">
                                <i className="pi pi-calendar-plus" style={{ color: '#666' }}></i>
                            </label>
                            <div style={{ maxWidth: '43%' }}>
                                <DatePicker
                                    selected={dateRdvFrom}
                                    onChange={(date) => setDateRdvFrom(date ? format(date, "yyyy-MM-dd") : null)}
                                    placeholderText="Du... "
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    style={{ width: '15px', marginRight: '8px' }}
                                />
                            </div>
                            <div style={{ maxWidth: '43%' }}>
                                <DatePicker
                                    selected={dateRdvTo}
                                    onChange={(date) => setDateRdvTo(date ? format(date, "yyyy-MM-dd") : null)}
                                    placeholderText="Date RDV"
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    style={{ maxWidth: '15px' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="input-group d-flex">
                            <label style={{ maxWidth: '14%' }} className="input-group-text" htmlFor="id_flt_clients_creation_1">
                                <i className="pi pi-calendar" style={{ color: '#666' }}></i>
                            </label>
                            <div style={{ maxWidth: '43%' }}>
                                <DatePicker
                                    selected={dateCreatedFrom}
                                    onChange={(date) => setDateCreatedFrom(date ? format(date, "yyyy-MM-dd") : null)}
                                    placeholderText="Du... "
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    style={{ width: '15px', marginRight: '8px' }}
                                />
                            </div>
                            <div style={{ maxWidth: '43%' }}>
                                <DatePicker
                                    selected={dateCreatedTo}
                                    onChange={(date) => setDateCreatedTo(date ? format(date, "yyyy-MM-dd") : null)}
                                    placeholderText="Date Creation"
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    style={{ maxWidth: '15px' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* static select */}
                    <div className="col-2">
                        <Select
                            options={equipeOptions}
                            value={equipeOptions.find(opt => opt.value === equipe?.value)}
                            onChange={setEquipe}
                            placeholder="Équipe"
                            isLoading={equipeLoading}
                        />
                    </div>
                    {/* <div className="col-2">
                        <Select options={options.civilite} value={civilite} placeholder="add selcet he" onChange={setCivilite} />
                    </div>
                    <div className="col-2">
                        <Select options={options.civilite} value={civilite} placeholder="add selcet her" onChange={setCivilite} />
                    </div> */}

                    <div className="col-2">
                        <Button variant="success" type="submit" onClick={handleFilter}>Appliquer</Button>
                        <Button variant="warning" onClick={handleCleanFilter} className="mx-1">Réinitialiser</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default FilterComponenttest;
