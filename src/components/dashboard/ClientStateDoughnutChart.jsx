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

        // Color mapping for each status
        const statusColors = {
            'A RAPPELER': '#FF6347',  // Tomato
            'NO STATUS': '#808080',   // Grey
            'NRP': '#FF4500',         // OrangeRed
            'INJOIGNABLE': '#00CED1', // DarkTurquoise
            'A RETRAITER': '#FFD700', // Gold
            'LEDS SOLAIRES': '#228B22', // ForestGreen
            'CONFIRMER RÉGIE': '#DC143C', // Crimson
            'Confirmer': '#32CD32',   // LimeGreen
            'Chantier annuler': '#8B0000', // DarkRed
            'SAV': '#4682B4',         // SteelBlue
            'RENVOYER EQUIPE SUR PLACE': '#800080', // Purple
            'RETOURNER RECUPERER LEDS': '#FFD700', // Gold
            'MANQUE PIÈCES': '#8A2BE2', // BlueViolet
            'LIVRAISON POSTALE': '#D2691E', // Chocolate
            'Chantier Terminé': '#1E90FF', // DodgerBlue
            'MANQUES RÉGLETTES': '#FF1493', // DeepPink
            'MPR': '#00FA9A'          // MediumSpringGreen
        };

        // Map the status colors for each label
        const backgroundColors = labels.map(status => statusColors[status] || '#808080'); // Default color if no specific match
        const hoverBackgroundColors = labels.map(status => `${statusColors[status] ? statusColors[status] + '80' : '#80808080'}`); // Slightly darker shade for hover

        const data = {
            labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: backgroundColors,
                    hoverBackgroundColor: hoverBackgroundColors
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
