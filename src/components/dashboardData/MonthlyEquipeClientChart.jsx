import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Chart } from 'primereact/chart';
import { fetchEquipes } from '../../features/equipeSlice';
import { fetchClients } from '../../features/clientSlice';

export default function MonthlyEquipeClientChart() {
    const dispatch = useDispatch();
    
    const { equipes = [] } = useSelector(state => state.equipe);
    const clients = useSelector(state => state.clients.clientsx) || [];

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        dispatch(fetchEquipes());
        dispatch(fetchClients());
    }, [dispatch]);

    useEffect(() => {
        if (equipes.length > 0 && clients.length > 0) {
            // Get the current month and year
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();

            // Initialize each equipe's count to 0
            const equipeCounts = {};
            equipes.forEach(equipe => {
                equipeCounts[equipe.name] = 0;
            });

            // Filter clients created in the current month and count them by equipe
            clients.forEach(client => {
                const clientDate = new Date(client.dateCreation);
                const clientMonth = clientDate.getMonth();
                const clientYear = clientDate.getFullYear();

                // If the client was created in the current month and year
                if (clientYear === currentYear && clientMonth === currentMonth) {
                    if (client.equipe && client.equipe._id) {
                        const matchedEquipe = equipes.find(e => e._id === client.equipe._id);
                        if (matchedEquipe) {
                            equipeCounts[matchedEquipe.name]++;
                        }
                    }
                }
            });

            const labels = Object.keys(equipeCounts);
            const values = Object.values(equipeCounts);

            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Clients Ajoutés Ce Mois par Équipe',
                        data: values,
                        backgroundColor: 'rgba(57, 235, 54, 0.2)',
                        borderColor: 'rgb(57, 235, 54)',
                        borderWidth: 1
                    }
                ]
            };

            const options = {
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: { autoSkip: false }
                    },
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,  // You wanted 0-50
                        ticks: {
                            stepSize: 5  // 0, 5, 10, 15...
                        }
                    }
                }
            };

            setChartData(data);
            setChartOptions(options);
        }
    }, [equipes, clients]);

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
}
