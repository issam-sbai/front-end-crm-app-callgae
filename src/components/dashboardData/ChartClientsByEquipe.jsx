import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function ChartClientsByEquipe() {
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipeData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/clients-by-equipe');
        const data = await response.json();

        const equipeNames = data.map(item => item.name);
        const clientCounts = data.map(item => item.value);

        const chartOptions = {
          title: {
            text: 'Nombre de Clients par Équipe',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          xAxis: {
            type: 'category',
            data: equipeNames,
            axisLabel: {
              rotate: 45,
              interval: 0,
            },
          },
          yAxis: {
            type: 'value',
            name: 'Clients',
            minInterval: 1,
          },
          series: [
            {
              name: 'Clients',
              type: 'bar',
              data: clientCounts,
              itemStyle: {
                color: '#91cc75',
              },
            },
          ],
        };

        setOptions(chartOptions);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch chart data:', err);
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchEquipeData();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card">
      <ReactECharts option={options} style={{ height: '400px', width: '100%' }} />
    </div>
  );
}
