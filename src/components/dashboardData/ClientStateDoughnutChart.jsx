import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

const STATUS_COLORS = {
    'A RAPPELER': '#FF6347',
    'NO STATUS': '#808080',
    'NRP': '#FF4500',
    'Confirmer': '#32CD32',
    'Chantier annuler': '#8B0000',
    'Chantier Terminé': '#1E90FF'
};

export default function ClientStateDoughnutChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/dashboard/client-status');
                const data = await res.json(); // expecting format: [{ status: 'NRP', count: 5 }, ...]

                const labels = data.map(item => item.status);
                const values = data.map(item => item.count);
                const backgroundColors = labels.map(status => STATUS_COLORS[status] || '#ccc');
                const hoverBackgroundColors = backgroundColors.map(color => color + '80');

                setChartData({
                    labels,
                    datasets: [{
                        data: values,
                        backgroundColor: backgroundColors,
                        hoverBackgroundColor: hoverBackgroundColors
                    }]
                });

                setChartOptions({
                    cutout: '60%',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#495057',
                                usePointStyle: true,
                                boxWidth: 8
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Failed to fetch chart data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="card flex justify-content-center w-full h-full">
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full h-full" />
        </div>
    );
}
