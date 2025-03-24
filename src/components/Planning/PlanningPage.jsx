import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../../features/clientSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import RdvCard from './PlanningComp/RdvCard';
import FilterComponent from './PlanningComp/FilterComponentPlanning';

// Helper functions
const formatDate = (date) => date.toISOString().split('T')[0];

const getMonday = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - (day === 0 ? 6 : day - 1);
  return new Date(d.setDate(diff));
};

const PlanningPage = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clientsx) || []; // Ensure clients is an array
  const status = useSelector((state) => state.clients.status);

  const [weekOffset, setWeekOffset] = useState(0);
  const today = new Date();
  const currentMonday = getMonday(today);
  const monday = new Date(currentMonday);
  monday.setDate(monday.getDate() + weekOffset * 7);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchClients());
    }
  }, [dispatch, status]);

  // Ensure appointments are correctly extracted
  const appointments = Array.isArray(clients) ? 
    clients.map(client => ({
      idRdv: client.idRdv,
      nomPrenom: client.nomPrenom,
      entreprise: client.entreprise || "N/A",
      telephone: client.telephone || "N/A",
      adresse: client.adresse || "N/A",
      cp: client.cp || "N/A",
      email: client.email || "N/A",
      statut: client.statut || "N/A",
      commentaire: client.commentaire || "",
      typeRdv: client.typeRdv || "N/A",
      dateRdv: client.dateRdv, // Ensure this field exists
    })) : [];

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekDays = dayNames.map((day, index) => {
    const dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + index);
    return { day, date: dayDate };
  });

  return (
    <>
      <FilterComponent />
      <div className="container-fluid align-items-center px-1 my-4">
        <div className="d-flex align-items-center mb-4 px-0" style={{ gap: '10px' }}>
          <button onClick={() => setWeekOffset(weekOffset - 1)} className="btn btn-success">Previous Week</button>
          <button onClick={() => setWeekOffset(weekOffset + 1)} className="btn btn-success">Next Week</button>
          <h5 className="m-0">{monday.toLocaleString('default', { month: 'short' }).toUpperCase()} {monday.getFullYear()}</h5>
        </div>

        <div className="row mx-0">
          {weekDays.map(({ day, date }) => {
            const dayAppointments = appointments.filter(apt => {
              // Check if the appointment's date is the same as the week day
              return formatDate(new Date(apt.dateRdv)) === formatDate(date);
            });
            const monthAbbr = date.toLocaleString('default', { month: 'short' });
            const dayNumber = date.getDate();

            return (
              <div key={date.toISOString()} className="col px-1 mb-0">
                <div className="card h-100">
                  <div className="card-header d-flex align-items-center text-red">
                    <div className="text-center px-3" style={{ minWidth: '60px', color: 'rgb(26, 115, 232)' }}>
                      <b>{monthAbbr}</b> {dayNumber}
                    </div>
                  </div>
                  <div className="card-body px-1">
                    {dayAppointments.length > 0 ? (
                      dayAppointments.map(apt => <RdvCard key={apt.idRdv} apt={apt} />)
                    ) : (
                      <p className="text-muted">No Appointments</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PlanningPage;
