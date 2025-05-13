import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../features/clientSlice';
import { getAllUsersAsync } from '../features/userSlice';
import { fetchEquipes } from '../features/equipeSlice';


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
      <h4>Hello</h4>
  );
};

export default Dashboard;
