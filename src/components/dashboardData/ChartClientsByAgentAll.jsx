import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function ChartClientsByAgentAll() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/dashboard/clients-by-agent');
                const data = await response.json();
                console.log(data);
                

                const labels = data.map(item => item.name);
                const values = data.map(item => item.value);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Nombre de Clients créés',
                            data: values,
                            backgroundColor: labels.map((_, i) => `hsl(${(i * 35) % 360}, 70%, 70%)`),
                            borderColor: labels.map((_, i) => `hsl(${(i * 35) % 360}, 70%, 40%)`),
                            borderWidth: 1
                        }
                    ]
                });

                setChartOptions({
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Nombre de clients par Agent' }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            precision: 0
                        }
                    }
                });

                setLoading(false);
            } catch (err) {
                console.error("Error fetching client data:", err);
                setError("Échec du chargement des données");
                setLoading(false);
            }
        };

        fetchClientData();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="card" style={{ direction: 'ltr' }}>
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
}
