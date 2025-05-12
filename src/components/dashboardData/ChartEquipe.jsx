import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useSelector } from 'react-redux';

export default function ChartEquipe() {
    const clients = useSelector((state) => state.clients.clientsx) || [];
    const { equipes, loading: equipeLoading, error: equipeError } = useSelector((state) => state.equipe);

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        if (!equipes) return;

        const equipeCountMap = {};

        // Start with all equipes and set 0 by default
        equipes.forEach(equipe => {
            equipeCountMap[equipe.nom] = 0;
        });

        let nonAssignedCount = 0;

        // Count clients for each equipe
        clients.forEach(client => {
            if (!client.equipe) {
                nonAssignedCount++;
            } else {
                const equipe = equipes.find(e => e._id === client.equipe);
                if (equipe) {
                    equipeCountMap[equipe.nom]++;
                } else {
                    nonAssignedCount++;  // If ID not found, treat it as "no equipe"
                }
            }
        });

        const labels = [...Object.keys(equipeCountMap), 'Non Assigné'];
        const values = [...Object.values(equipeCountMap), nonAssignedCount];

        const data = {
            labels,
            datasets: [
                {
                    label: 'Nombre de Clients',
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
                title: { display: true, text: 'Nombre de clients par équipe' }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    precision: 0
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [clients, equipes]);

    if (equipeLoading) return <div>Chargement des équipes...</div>;
    if (equipeError) return <div>Erreur : {equipeError}</div>;

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
}
