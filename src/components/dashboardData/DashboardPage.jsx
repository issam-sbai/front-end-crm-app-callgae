import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../../features/clientSlice';
import { getAllUsersAsync } from '../../features/userSlice';
import { fetchEquipes } from '../../features/equipeSlice';
import ClientStateDoughnutChart from './ClientStateDoughnutChart';
import ChartEquipe from './ChartEquipe';
import EquipeClientChart from './EquipeClientChart';
import MonthlyEquipeClientChart from './MonthlyEquipeClientChart';
import ChartClientsByAgentThisMonth from './ChartClientsByAgentThisMonth';
import ChartClientsByAgent from './ChartClientsByAgent';
import ChartClientsByAgentThisDay from './ChartClientsByAgentThisDay';

const cardStyle = (bg) => ({
  backgroundColor: bg,
  borderRadius: '8px',
  color: '#fff',
  padding: '16px',
  minHeight: '100px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  fontSize: '0.9rem',
});

const titleStyle = {
  marginBottom: '4px',
  fontWeight: 500,
  fontSize: '0.85rem',
  opacity: 0.9,
};

const numberStyle = {
  fontSize: '1.5rem',
  fontWeight: '600',
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const clients = useSelector((state) => state.clients.clientsx) || [];
  const clientStatus = useSelector((state) => state.clients.status);

  const { users = [], status: userStatus } = useSelector((state) => state.user);

  const { equipes = [], loading: equipeLoading, error: equipeError } = useSelector(
    (state) => state.equipe
  );

  useEffect(() => {
    if (clientStatus === 'idle') dispatch(fetchClients());
    if (userStatus === 'idle') dispatch(getAllUsersAsync());
    if (equipes.length === 0 && !equipeLoading) dispatch(fetchEquipes());
  }, [dispatch, clientStatus, userStatus, equipes.length, equipeLoading]);

  const rdvCount = clients.filter((client) => client.dateRdv).length;

  const cards = [
    {
      title: 'Clients',
      value: clients.length,
      bg: '#4e73df',
    },
    {
      title: 'Users',
      value: users.length,
      bg: '#1cc88a',
    },
    {
      title: 'RDVs',
      value: rdvCount,
      bg: '#36b9cc',
    },
    {
      title: 'Equipes',
      value: equipeLoading ? '...' : equipeError ? 'Err' : equipes.length,
      bg: '#f6c23e',
    },
  ];

  return (
    // <div className="my-4 px-2">
    //   <div className="row g-3 justify-content-center">
    //     {cards.map((card, index) => (
    //       <div className="col-6 col-sm-4 col-md-3" key={index}>
    //         <div style={cardStyle(card.bg)}>
    //           <div style={titleStyle}>{card.title}</div>
    //           <div style={numberStyle}>{card.value}</div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    //   <br />
      <h4>Client Status</h4>
      // <ClientStateDoughnutChart />
      // <br />
      // <div style={{ display: 'flex', gap: '20px', }}>
      //   <div style={{ flex: '1', height: '100%' }}>
      //     <p>Clients Ajoutés par Équipe</p>
      //     <EquipeClientChart />
      //   </div>

      //   <div style={{ flex: '1', height: '100%' }}>
      //     <p>Clients Ajoutés Ce Mois par Équipe</p>
      //     <MonthlyEquipeClientChart />
      //   </div>
      // </div>

      // <h4>Ageny chart</h4>
      // <ChartClientsByAgentThisDay />
      // <br />

      // <br />

      // <div style={{ display: 'flex', gap: '20px', }}>
      //   <div style={{ flex: '1', height: '100%' }}>
      //     <p>Clients Ajoutés par Agent</p>
      //     <ChartClientsByAgent />
      //   </div>

      //   <div style={{ flex: '1', height: '100%' }}>
      //     <p>Clients Ajoutés Ce Mois par Agent</p>
      //     <ChartClientsByAgentThisMonth />
      //   </div>
      // </div>

      // <br />
      



    // </div>

  );
};

export default Dashboard;
