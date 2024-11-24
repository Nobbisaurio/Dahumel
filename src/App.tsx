import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Duhamel.css'; // Importamos los estilos

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type SystemParams = {
  dt: number; // Incremento de tiempo
  m: number; // Masa del sistema
  k: number; // Rigidez
  xi: number; // Factor de amortiguamiento
};

const Duhamel: React.FC = () => {
  const [accelerations, setAccelerations] = useState<number[]>([]);
  const [params, setParams] = useState<SystemParams>({ dt: 0.02, m: 1000, k: 50000, xi: 0.05 });
  const [results, setResults] = useState<{ time: number[]; displacement: number[]; velocity: number[]; acceleration: number[] } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const data = text.split('\n').map(Number).filter((v) => !isNaN(v));
      setAccelerations(data);
    };
    reader.readAsText(file);
  };

  const calculateResponse = () => {
    const { dt, m, k, xi } = params;
    const wn = Math.sqrt(k / m);
    const wd = wn * Math.sqrt(1 - xi ** 2);

    const time = accelerations.map((_, i) => i * dt);
    const displacement = new Array(accelerations.length).fill(0);
    const velocity = new Array(accelerations.length).fill(0);
    const acceleration = new Array(accelerations.length).fill(0);

    for (let i = 1; i < accelerations.length; i++) {
      let du = 0;
      for (let j = 0; j < i; j++) {
        du +=
          accelerations[j] *
          Math.exp(-xi * wn * (time[i] - time[j])) *
          Math.sin(wd * (time[i] - time[j])) *
          dt;
      }
      displacement[i] = du * (-1 / (m * wd));
    }

    for (let i = 1; i < displacement.length; i++) {
      velocity[i] = (displacement[i] - displacement[i - 1]) / dt;
      if (i > 1) {
        acceleration[i] = (velocity[i] - velocity[i - 1]) / dt;
      }
    }

    setResults({ time, displacement, velocity, acceleration });
  };

  const renderChart = (label: string, data: number[]) => (
    <div className="chart">
      <Line
        data={{
          labels: results?.time,
          datasets: [
            {
              label,
              data,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
          },
        }}
      />
    </div>
  );

  return (
    <div className="container">
      <h2>Integral de Duhamel</h2>
      <div className="file-upload">
        <label>Cargar archivo de aceleraciones:</label>
        <input type="file" accept=".dat" onChange={handleFileUpload} />
      </div>
      <div className="parameters">
        <h3>Parámetros del sistema</h3>
        {['dt', 'm', 'k', 'xi'].map((key) => (
          <div key={key} className="parameter-item">
            <label>
              {key === 'dt' ? 'Incremento de tiempo (dt)' : key === 'm' ? 'Masa (m)' : key === 'k' ? 'Rigidez (k)' : 'Factor de amortiguamiento (xi)'}:
            </label>
            <input
              type="number"
              value={(params as any)[key]}
              onChange={(e) => setParams({ ...params, [key]: parseFloat(e.target.value) })}
            />
          </div>
        ))}
      </div>
      <button className="calculate-button" onClick={calculateResponse}>
        Calcular Respuesta
      </button>
      <h3 className='result-title'>Resultados</h3>
      {results && (
        <div className="results">
          {renderChart('Desplazamiento', results.displacement)}
          {renderChart('Velocidad', results.velocity)}
          {renderChart('Aceleración', results.acceleration)}
        </div>
      )}
    </div>
  );
};

export default Duhamel;
