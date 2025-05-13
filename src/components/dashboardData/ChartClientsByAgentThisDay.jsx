import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function ChartClientsByAgentToday() {
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://crm-backend-rs8c.onrender.com/api/dashboard/clients-by-agent-today');
        const data = await response.json();

        const agentNames = data.map(item => item.name);
        const clientCounts = data.map(item => item.value);

        setOptions({
          title: {
            text: 'Clients créés aujourd\'hui par Agent'
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: agentNames,
            axisLabel: {
              rotate: 45,
              interval: 0
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
                color: '#91CC75'
              }
            }
          ]
        });

        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement :', err);
        setError('Erreur de chargement');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return <ReactECharts option={options} style={{ height: '400px', width: '100%' }} />;
}
