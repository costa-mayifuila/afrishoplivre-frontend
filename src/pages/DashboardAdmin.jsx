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

const DashboardAdmin = () => {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem('token');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (!token) return;

    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Erro ao carregar dashboard admin:', err);
      }
    };
    fetchStats();
  }, [token]);

  if (!stats) return <p className="p-6 text-gray-600">🔄 Carregando dados do dashboard...</p>;

  const chartData = {
    labels: Object.keys(stats.vendasMensais || {}),
    datasets: [
      {
        label: 'Faturamento Mensal (Kz)',
        data: Object.values(stats.vendasMensais || {}),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-700">
        📊 Dashboard Administrativo
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded text-center shadow">
          <p className="text-3xl font-bold">{stats.totalUsuarios ?? 0}</p>
          <p className="text-gray-700">Usuários Registrados</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded text-center shadow">
          <p className="text-3xl font-bold">{stats.totalPedidos ?? 0}</p>
          <p className="text-gray-700">Pedidos Realizados</p>
        </div>
        <div className="bg-green-100 p-4 rounded text-center shadow">
          <p className="text-3xl font-bold">
            Kz {Number(stats.faturamentoTotal || 0).toLocaleString("pt-AO")}
          </p>
          <p className="text-gray-700">Faturamento Total</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">📅 Faturamento por Mês</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default DashboardAdmin;
