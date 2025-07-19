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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Erro ao carregar dashboard admin:', err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="p-6">Carregando dados do dashboard...</p>;

  const chartData = {
    labels: Object.keys(stats.vendasMensais),
    datasets: [
      {
        label: 'Faturamento Mensal (Kz)',
        data: Object.values(stats.vendasMensais),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-700">📊 Dashboard Administrativo</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded text-center">
          <p className="text-3xl font-bold">{stats.totalUsuarios}</p>
          <p>Usuários Registrados</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded text-center">
          <p className="text-3xl font-bold">{stats.totalPedidos}</p>
          <p>Pedidos Realizados</p>
        </div>
        <div className="bg-green-100 p-4 rounded text-center">
          <p className="text-3xl font-bold">Kz {stats.faturamentoTotal.toLocaleString()}</p>
          <p>Faturamento Total</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">📅 Faturamento por Mês</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default DashboardAdmin;
