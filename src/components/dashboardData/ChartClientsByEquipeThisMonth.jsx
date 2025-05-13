import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function ChartClientsByEquipeThisMonth() {
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch('https://crm-backend-rs8c.onrender.com/api/dashboard/clients-by-equipe-this-month');
        const data = await response.json();

        const labels = data.map(item => item.name);
        const values = data.map(item => item.value);

        setOptions({
          title: {
            text: 'Nombre de Clients par Équipe (Ce Mois)',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: labels,
            axisLabel: {
              rotate: 30
            }
          },
          yAxis: {
            type: 'value',
            minInterval: 1
          },
          series: [
            {
              name: 'Clients',
              type: 'bar',
              data: values,
              itemStyle: {
                color: '#4CAF50'
              },
              label: {
                show: true,
                position: 'top'
              }
            }
          ]
        });

        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement du graphique :', err);
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) return <div>Chargement du graphique...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card">
      <ReactECharts option={options} style={{ height: '400px', width: '100%' }} />
    </div>
  );
}
