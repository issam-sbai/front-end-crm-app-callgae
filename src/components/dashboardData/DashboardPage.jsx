import React, { useEffect, useState } from 'react';
import ClientStateDoughnutChart from './ClientStateDoughnutChart';

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

const DashboardPage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard/overview');
        const data = await res.json();
        setCards(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchCardData();
  }, []);

  return (
    <div className="px-2">
      <div className="row g-3 justify-content-center">
        {cards.map((card, index) => (
          <div className="col-6 col-sm-4 col-md-3" key={index}>
            <div style={cardStyle(card.bg)}>
              <div style={titleStyle}>{card.title}</div>
              <div style={numberStyle}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <h4>Client Status</h4>
      <ClientStateDoughnutChart />
    </div>
  );
};

export default DashboardPage;
