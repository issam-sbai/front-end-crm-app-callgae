import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function ChartClientsByAgentThisMonth() {
    const [options, setOptions] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/dashboard/clients-by-agent-this-month');
                const data = await response.json();

                const agentNames = data.map(item => item.name);
                const clientCounts = data.map(item => item.value);

                setOptions({
                    title: {
                        text: 'Nombre de clients par Agent (ce mois)'
                    },
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: agentNames,
                        axisLabel: {
                            rotate: 45,
                            interval: 0,
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'Clients',
                            type: 'bar',
                            data: clientCounts,
                            itemStyle: {
                                color: '#73C0DE'
                            }
                        }
                    ]
                });

                setLoading(false);
            } catch (err) {
                console.error('Error loading chart data:', err);
                setError('Erreur lors du chargement du graphique');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return <ReactECharts option={options} style={{ height: '400px', width: '100%' }} />;
}
