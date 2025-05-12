import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Chart } from 'primereact/chart';
import { fetchEquipes } from '../../features/equipeSlice';
import { fetchClients } from '../../features/clientSlice';

export default function EquipeClientChart() {
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
        if (equipes.length > 0) {

            // Initialize each equipe's count to 0
            const equipeCounts = {};
            equipes.forEach(equipe => {
                equipeCounts[equipe.name] = 0;
            });

            // Count clients for each equipe
            clients.forEach(client => {
                if (client.equipe && client.equipe._id) {
                    const matchedEquipe = equipes.find(e => e._id === client.equipe._id);
                    if (matchedEquipe) {
                        equipeCounts[matchedEquipe.name]++;
                    }
                }
            });

            const labels = Object.keys(equipeCounts);
            const values = Object.values(equipeCounts);

            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Nombre de Clients par Équipe',
                        data: values,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgb(54, 162, 235)',
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
                            stepSize: 5  // 0,5,10,15,20...
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
            <Chart type="bar" data={chartData} options={chartOptions}  />
        </div>
    );
}
