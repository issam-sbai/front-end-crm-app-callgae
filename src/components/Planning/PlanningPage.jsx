import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RdvCard from './PlanningComp/RdvCard';

// Helper functions
const formatDate = (date) => date.toISOString().split('T')[0];

const getMonday = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - (day === 0 ? 6 : day - 1);
  return new Date(d.setDate(diff));
};

const PlanningPage = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [appointmentsByDay, setAppointmentsByDay] = useState({});
  const today = new Date();
  const currentMonday = getMonday(today);
  const monday = new Date(currentMonday);
  monday.setDate(monday.getDate() + weekOffset * 7);

  // You should get these from your auth state or context, for example:
  const role = localStorage.getItem("role");
  const equipeId = localStorage.getItem("equipId");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchRdvs = async () => {
      try {
        const params = new URLSearchParams({
          startDate: formatDate(monday),
          username,
          role,
          equipeId,
        });

        const res = await fetch(`https://crm-backend-rs8c.onrender.com/api/rdvs/weekly?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch RDVs');

        const data = await res.json();
        setAppointmentsByDay(data);
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching RDVs:', error);
      }
    };

    fetchRdvs();
  }, [monday, username, role, equipeId]);

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekDays = dayNames.map((day, index) => {
    const dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + index);
    return { day, date: dayDate };
  });

  return (
    <div className="container-fluid align-items-center px-1 my-4">
      <div className="d-flex align-items-center mb-4 px-0" style={{ gap: '10px' }}>
        <button onClick={() => setWeekOffset(weekOffset - 1)} className="btn btn-success">Previous Week</button>
        <button onClick={() => setWeekOffset(weekOffset + 1)} className="btn btn-success">Next Week</button>
        <h5 className="m-0">{monday.toLocaleString('default', { month: 'short' }).toUpperCase()} {monday.getFullYear()}</h5>
      </div>

      <div className="row mx-0">
        {weekDays.map(({ day, date }) => {
          const dateKey = formatDate(date);
          const dayAppointments = appointmentsByDay[dateKey] || [];
          const monthAbbr = date.toLocaleString('default', { month: 'short' });
          const dayNumber = date.getDate();

          return (
            <div key={date.toISOString()} className="col px-1 pt-0 mb-0">
              <div className="card h-100">
                <div className="card-header d-flex align-items-center text-red">
                  <div className="text-center px-3"
                    style={{
                      minWidth: '60px',
                      color: dateKey === formatDate(new Date()) ? 'red' : 'rgb(26, 115, 232)'
                    }}>
                    <b>{monthAbbr}</b> {dayNumber}
                  </div>
                </div>
                <div className="card-body px-0">
                  <span className="small fw-bold">
                    {dayAppointments.length} RDV {dayAppointments.filter(apt => apt.statut === "Confirmer").length} Confirmés
                  </span>
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
  );
};

export default PlanningPage;
