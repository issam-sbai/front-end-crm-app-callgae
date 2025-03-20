// PlanningPage.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RdvCard from './PlanningComp/RdvCard';
import FilterComponent from './PlanningComp/FilterComponentPlanning';
import { Button } from 'primereact/button';


// Helper to format a Date object as YYYY-MM-DD
const formatDate = (date) => date.toISOString().split('T')[0];

// Helper to get Monday for a given date
const getMonday = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 (Sun) to 6 (Sat)
  const diff = d.getDate() - (day === 0 ? 6 : day - 1); // adjust when day is Sunday
  return new Date(d.setDate(diff));
};

// Sample appointment data (using your originalData structure)
const appointments = [
  {
    idRdv: "R001",
    nomPrenom: "John Doe",
    entreprise: "ABC Ltd.",
    telephone: "555-987-6543",
    adresse: "123 Main St.",
    cp: "75001",
    email: "john.doe@example.com",
    agentId: "A1",
    dateRdv: "2025-03-20",
    typeRdv: "Extérieur",
    commentaire: "No comments",
    siret: "123456789",
    statut: "Confirmed",
    civilite: "M.",
    telephone2: "555-222-3333",
  },
  {
    idRdv: "R002",
    nomPrenom: "Alice Smith",
    entreprise: "XYZ Corp.",
    telephone: "555-123-4567",
    adresse: "456 Elm St.",
    cp: "75002",
    email: "alice.smith@example.com",
    agentId: "A2",
    dateRdv: "2025-03-18",
    typeRdv: "Bureau",
    commentaire: "Needs follow-up",
    siret: "987654321",
    statut: "Pending",
    civilite: "Mme.",
    telephone2: "555-111-2222",
  },
  {
    idRdv: "R003",
    nomPrenom: "Michael Johnson",
    entreprise: "Tech Innovations",
    telephone: "555-654-3210",
    adresse: "789 Oak St.",
    cp: "75003",
    email: "michael.j@example.com",
    agentId: "A3",
    dateRdv: "2025-03-19",
    typeRdv: "Téléphone",
    commentaire: "Requested a callback",
    siret: "123987456",
    statut: "Confirmed",
    civilite: "M.",
    telephone2: "555-333-4444",
  },
  {
    idRdv: "R004",
    nomPrenom: "Emma Davis",
    entreprise: "Softwares Ltd.",
    telephone: "555-777-8888",
    adresse: "101 Pine St.",
    cp: "75004",
    email: "emma.davis@example.com",
    agentId: "A4",
    dateRdv: "2025-03-21",
    typeRdv: "Extérieur",
    commentaire: "Urgent meeting",
    siret: "789456123",
    statut: "Pending",
    civilite: "Mme.",
    telephone2: "555-555-6666",
  },
  {
    idRdv: "R005",
    nomPrenom: "Robert Brown",
    entreprise: "Finance Group",
    telephone: "555-999-0000",
    adresse: "202 Birch St.",
    cp: "75005",
    email: "robert.brown@example.com",
    agentId: "A5",
    dateRdv: "2025-03-22",
    typeRdv: "Bureau",
    commentaire: "Interested in investment",
    siret: "456123789",
    statut: "Confirmed",
    civilite: "M.",
    telephone2: "555-777-9999",
  },
  {
    idRdv: "R006",
    nomPrenom: "Sophia Wilson",
    entreprise: "Marketing Hub",
    telephone: "555-321-6540",
    adresse: "303 Maple St.",
    cp: "75006",
    email: "sophia.wilson@example.com",
    agentId: "A6",
    dateRdv: "2025-03-18",
    typeRdv: "Téléphone",
    commentaire: "Requested brochures",
    siret: "654987321",
    statut: "Pending",
    civilite: "Mme.",
    telephone2: "555-888-0000",
  },
  {
    idRdv: "R007",
    nomPrenom: "David Martinez",
    entreprise: "Auto Motors",
    telephone: "555-111-2233",
    adresse: "404 Cedar St.",
    cp: "75007",
    email: "david.m@example.com",
    agentId: "A7",
    dateRdv: "2025-03-19",
    typeRdv: "Extérieur",
    commentaire: "Looking for fleet services",
    siret: "852741963",
    statut: "Confirmed",
    civilite: "M.",
    telephone2: "555-222-3344",
  },
  {
    idRdv: "R008",
    nomPrenom: "Olivia Garcia",
    entreprise: "E-commerce Inc.",
    telephone: "555-444-5555",
    adresse: "505 Redwood St.",
    cp: "75008",
    email: "olivia.g@example.com",
    agentId: "A8",
    dateRdv: "2025-03-20",
    typeRdv: "Bureau",
    commentaire: "Discussion about payment gateway",
    siret: "963852741",
    statut: "Pending",
    civilite: "Mme.",
    telephone2: "555-666-7777",
  },
  {
    idRdv: "R009",
    nomPrenom: "James Anderson",
    entreprise: "Logistics Co.",
    telephone: "555-555-6666",
    adresse: "606 Fir St.",
    cp: "75009",
    email: "james.a@example.com",
    agentId: "A9",
    dateRdv: "2025-03-21",
    typeRdv: "Extérieur",
    commentaire: "Planning warehouse expansion",
    siret: "741963852",
    statut: "Confirmed",
    civilite: "M.",
    telephone2: "555-777-8888",
  },
  {
    idRdv: "R010",
    nomPrenom: "Isabella Thomas",
    entreprise: "Tech World",
    telephone: "555-999-1111",
    adresse: "707 Spruce St.",
    cp: "75010",
    email: "isabella.t@example.com",
    agentId: "A10",
    dateRdv: "2025-03-22",
    typeRdv: "Téléphone",
    commentaire: "Discussing new app launch",
    siret: "369258147",
    statut: "Pending",
    civilite: "Mme.",
    telephone2: "555-111-3333",
  },
  {
    idRdv: "R011",
    nomPrenom: "Liam Harris",
    entreprise: "Retail Solutions",
    telephone: "555-222-4444",
    adresse: "808 Ash St.",
    cp: "75011",
    email: "liam.h@example.com",
    agentId: "A11",
    dateRdv: "2025-03-18",
    typeRdv: "Bureau",
    commentaire: "Interested in partnership",
    siret: "159753486",
    statut: "Confirmed",
    civilite: "M.",
    telephone2: "555-444-6666",
  },
  {
    idRdv: "R012",
    nomPrenom: "Charlotte White",
    entreprise: "Construction Ltd.",
    telephone: "555-777-9999",
    adresse: "909 Willow St.",
    cp: "75012",
    email: "charlotte.w@example.com",
    agentId: "A12",
    dateRdv: "2025-03-19",
    typeRdv: "Extérieur",
    commentaire: "Site visit scheduled",
    siret: "987321654",
    statut: "Pending",
    civilite: "Mme.",
    telephone2: "555-888-2222",
  }
];


const PlanningPage = () => {
  // weekOffset: 0 represents the current week, -1 for previous week, 1 for next week, etc.
  const [weekOffset, setWeekOffset] = useState(0);

  // Calculate Monday of the week based on current date and offset
  const today = new Date();
  const currentMonday = getMonday(today);
  const monday = new Date(currentMonday);
  monday.setDate(monday.getDate() + weekOffset * 7);

  // Days of the week (Monday to Saturday)
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Create an array of days for the week with their corresponding date
  const weekDays = dayNames.map((day, index) => {
    const dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + index);
    return { day, date: dayDate };
  });

  // Handlers for pagination
  const handlePreviousWeek = () => setWeekOffset(weekOffset - 1);
  const handleNextWeek = () => setWeekOffset(weekOffset + 1);

  return (
    <>

      <FilterComponent />
      <div className="container-fluid align-items-center  px-1 my-4">

        <div className="d-flex align-items-center mb-4 px-0" style={{ gap: '10px' }}>
          <button onClick={handlePreviousWeek} className="btn btn-success">Previous Week</button>
          <button onClick={handleNextWeek} className="btn btn-success">Next Week</button>
          <h5 className="m-0">{monday.toLocaleString('default', { month: 'short' }).toUpperCase()} {monday.getFullYear()}</h5>
        </div>



        <div className="row mx-0">
          {weekDays.map(({ day, date }) => {
            // Filter appointments matching the current day (using dateRdv field)
            const dayAppointments = appointments.filter(
              (apt) => apt.dateRdv === formatDate(date)
            );
            // Get month abbreviation and day number
            const monthAbbr = date.toLocaleString('default', { month: 'short' });
            const dayNumber = date.getDate();

            return (
              <div key={date.toISOString()} className="col px-1 mb-0">
                <div className="card h-100">
                  <div className="card-header d-flex flex align-items-center text-red" style={{ margin: 0, padding: 0 }}>
                    <div className="text-center px-3 " style={{ minWidth: '60px', margin: 0, padding: 5 ,color: 'rgb(26, 115, 232)' }}>
                      <div style={{ fontSize: '1rem', margin: 0, padding: 0 }}> <b> {monthAbbr} </b> {dayNumber}</div>
                    </div>
                  </div>

                  <div className="card-body px-1  ">
                    {dayAppointments.length > 0 ? (
                      dayAppointments.map(apt => (
                        <RdvCard key={apt.idRdv} apt={apt} /> // Use RdvCard component
                      ))
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
