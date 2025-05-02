import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useSelector } from 'react-redux';

export default function ChartClientsByAgent() {
    const clients = useSelector((state) => state.clients.clientsx) || [];
    const users = useSelector((state) => state.user.users) || [];

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        if (!users) return;

        // Get only users with role agent
        const agents = users.filter(user => user.role === 'agent');

        const agentUsernames = agents.map(agent => agent.username);

        const agentCountMap = {};

        // Initialize map with known agents
        agentUsernames.forEach(username => {
            agentCountMap[username] = 0;
        });

        // Now count clients
        clients.forEach(client => {
            if (client.agentId) {
                if (agentCountMap.hasOwnProperty(client.agentId)) {
                    agentCountMap[client.agentId]++;
                } else {
                    // If agentId not matched with any username, add it dynamically
                    if (!agentCountMap[client.agentId]) {
                        agentCountMap[client.agentId] = 1;
                    } else {
                        agentCountMap[client.agentId]++;
                    }
                }
            }
            // if no agentId, you can ignore or handle differently
        });

        const labels = Object.keys(agentCountMap);
        const values = Object.values(agentCountMap);

        const data = {
            labels,
            datasets: [
                {
                    label: 'Nombre de Clients créés',
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
                    borderWidth: 1
                }
            ]
        };

        const options = {
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Nombre de clients par Agent' }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    precision: 0,
                }
            }
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
