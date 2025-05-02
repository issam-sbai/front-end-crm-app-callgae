import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useSelector } from 'react-redux';

export default function ChartClientsByAgentThisMonth() {
  const clients = useSelector((state) => state.clients.clientsx) || [];
  const users = useSelector((state) => state.user.users) || [];

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (!users.length) return;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const agents = users.filter((user) => user.role === 'agent');

    const agentCountMap = {};
    agents.forEach((agent) => {
      agentCountMap[agent.username] = 0;
    });

    clients.forEach((client) => {
      if (client.createdAt) {
        const createdAtDate = new Date(client.createdAt);
        const isThisMonth =
          createdAtDate.getMonth() === currentMonth &&
          createdAtDate.getFullYear() === currentYear;

        if (isThisMonth && client.agentId) {
          // Match agentId to username or default to ID if no match
          const agent = users.find((u) => u._id === client.agentId);
          const agentKey = agent ? agent.username : client.agentId;

          if (agentCountMap.hasOwnProperty(agentKey)) {
            agentCountMap[agentKey]++;
          } else {
            agentCountMap[agentKey] = 1;
          }
        }
      }
    });

    const labels = Object.keys(agentCountMap);
    const values = Object.values(agentCountMap);

    const data = {
      labels,
      datasets: [
        {
          label: 'Nombre de Clients créés ce mois',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: 'Nombre de clients par Agent (Ce Mois)',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          precision: 0,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [clients, users]);

  return (
    <div className="card">
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
}
