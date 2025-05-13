import React, { useEffect, useState } from 'react';
import ClientStateDoughnutChart from './ClientStateDoughnutChart';
import ChartClientsByAgent from './ChartClientsByAgentAll';
import ChartClientsByAgentThisMonth from './ChartClientsByAgentThisMonth';
import ChartClientsByAgentToday from './ChartClientsByAgentThisDay';
import ChartClientsByEquipe from './ChartClientsByEquipe';
import ChartClientsByEquipeThisMonth from './ChartClientsByEquipeThisMonth';

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
        const res = await fetch('https://crm-backend-rs8c.onrender.com/api/dashboard/overview');
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
      <br />
      <ChartClientsByAgent/>
      <br /> 
      <div style={{ display: 'flex', gap: '20px', }}>
            <div style={{ flex: '1', height: '100%' }}>
              <ChartClientsByAgentThisMonth />
            </div>
            <div style={{ flex: '1', height: '100%' }}>
              <ChartClientsByAgentToday />
            </div>
      </div>
      <br />
      <h4>Equipe Status</h4>
      <br />
      <div style={{ display: 'flex', gap: '20px', }}>
          <div style={{ flex: '1', height: '100%' }}>
            <ChartClientsByEquipe/>
          </div>

          <div style={{ flex: '1', height: '100%' }}>
            <ChartClientsByEquipeThisMonth />
          </div>
      </div>

    </div>
  );
};

export default DashboardPage;





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
    // <ClientStateDoughnutChart />
    // <br />


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