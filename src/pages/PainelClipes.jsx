import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PainelClipes = () => {
  const [clips, setClips] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMyClips = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/clips/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClips(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyClips();
  }, []);

  const totalCurtidas = clips.reduce((acc, c) => acc + c.likes, 0);
  const totalCompartilhamentos = clips.reduce((acc, c) => acc + c.shares, 0);

  const topCurtidos = [...clips]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  const chartData = {
    labels: topCurtidos.map((c) => `ID ${c._id.slice(-4)}`),
    datasets: [
      {
        label: 'Curtidas',
        data: topCurtidos.map((c) => c.likes),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold text-blue-700 mb-4">📊 Painel de Estatísticas</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 text-blue-800 p-4 rounded text-center">
          <p className="text-3xl font-bold">{clips.length}</p>
          <p>Clipes Enviados</p>
        </div>
        <div className="bg-pink-100 text-pink-800 p-4 rounded text-center">
          <p className="text-3xl font-bold">{totalCurtidas}</p>
          <p>Total de Curtidas</p>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded text-center">
          <p className="text-3xl font-bold">{totalCompartilhamentos}</p>
          <p>Compartilhamentos</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Top 5 clipes mais curtidos</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default PainelClipes;
