import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useSelector } from 'react-redux';

const STATUSES = [
    'A RAPPELER',
    'NO STATUS',
    'NRP',
    'Confirmer',
    'Chantier annuler',
    'Chantier Terminé'
];

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
    const clients = useSelector((state) => state.clients.clientsx) || [];

    useEffect(() => {
        const counts = STATUSES.reduce((acc, status) => {
            acc[status] = 0;
            return acc;
        }, {});

        clients.forEach(({ statusChantier }) => {
            if (counts[statusChantier] !== undefined) {
                counts[statusChantier]++;
            }
        });

        const labels = Object.keys(counts);
        const values = Object.values(counts);

        const backgroundColors = labels.map(status => STATUS_COLORS[status] || '#ccc');
        const hoverBackgroundColors = labels.map(color => color + '80');

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
    }, [clients]);

    return (
        <div className="card flex justify-content-center w-full h-full">
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full h-full" />
        </div>
    );
}
