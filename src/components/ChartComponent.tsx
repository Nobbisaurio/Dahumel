import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartComponentProps {
  data: number[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  const labels = data.map((_, i) => i); // Etiquetas para el eje X
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Desplazamiento',
        data,
        borderColor: 'blue',
        borderWidth: 2,
        tension: 0.4, // Suaviza la curva
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Desplazamiento vs Tiempo',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ChartComponent;

