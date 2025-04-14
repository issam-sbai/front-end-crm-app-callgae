import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useSelector } from 'react-redux';

export default function ClientStateDoughnutChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    
    // Access the clients state from Redux (or pass as prop if you have a custom data source)
    const clients = useSelector((state) => state.clients.clientsx) || [];

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);

        // Step 1: Calculate the counts of client statuses from statusChantier
        const statusCounts = {
            'A RAPPELER': 0,
            'NO STATUS': 0,
            'NRP': 0,
            'INJOIGNABLE': 0,
            'A RETRAITER': 0,
            'LEDS SOLAIRES': 0,
            'CONFIRMER RÉGIE': 0,
            'Confirmer': 0,
            'Chantier annuler': 0,
            'SAV': 0,
            'RENVOYER EQUIPE SUR PLACE': 0,
            'RETOURNER RECUPERER LEDS': 0,
            'MANQUE PIÈCES': 0,
            'LIVRAISON POSTALE': 0,
            'Chantier Terminé': 0,
            'MANQUES RÉGLETTES': 0,
            'MPR': 0
        };

        // Count each client status
        clients.forEach(client => {
            const status = client.statusChantier;
            if (statusCounts[status] !== undefined) {
                statusCounts[status]++;
            }
        });

        // Step 2: Prepare chart data
        const labels = Object.keys(statusCounts);
        const values = Object.values(statusCounts);

        const data = {
            labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--pink-500'),
                        documentStyle.getPropertyValue('--cyan-500'),
                        documentStyle.getPropertyValue('--orange-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--teal-500'),
                        documentStyle.getPropertyValue('--indigo-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--pink-400'),
                        documentStyle.getPropertyValue('--cyan-400'),
                        documentStyle.getPropertyValue('--orange-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--red-400'),
                        documentStyle.getPropertyValue('--teal-400'),
                        documentStyle.getPropertyValue('--indigo-400'),
                    ]
                }
            ]
        };

        // Step 3: Set the options for the chart
        const options = {
            cutout: '60%', // Make the center hole smaller if you want to see more of the chart
            responsive: true,
            maintainAspectRatio: false, // Allows the chart to fill the available container
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#495057', // Color for labels
                        usePointStyle: true,
                        boxWidth: 8
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [clients]); // Recalculate whenever clients state changes

    return (
        <div className="card flex justify-content-center" style={{ width: '100%', height: '100%' }}>
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full h-full" />
        </div>
    );
}
