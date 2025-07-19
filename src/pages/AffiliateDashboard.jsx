import React, { useEffect, useState } from "react";
import api from "../api/api";
import Notifications from "../components/Notifications";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AffiliateDashboard() {
  const [affiliateData, setAffiliateData] = useState([]);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await api.get("/affiliates/earnings");
        setAffiliateData(res.data);
      } catch (error) {
        console.error("Erro ao buscar dados de afiliado:", error);
      }
    };

    fetchEarnings();
  }, []);

  // Cálculos de resumo
  const totalVendas = affiliateData.reduce((sum, item) => sum + item.totalSales, 0);
  const totalGanhos = affiliateData.reduce((sum, item) => sum + item.totalEarnings, 0);
  const totalProdutos = affiliateData.length;

  // Dados para o gráfico
  const chartData = {
    labels: affiliateData.map((item) => item.product),
    datasets: [
      {
        label: "Vendas por Produto",
        data: affiliateData.map((item) => item.totalSales),
        backgroundColor: "#2563EB", // Azul
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 14 } },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700 text-center">
          💰 Painel de Afiliados
        </h2>

        {/* 🔔 Notificações */}
        <div className="mb-6">
          <Notifications />
        </div>

        {/* 📊 Cards de Resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium">Total de Vendas</h3>
            <p className="text-2xl font-bold">{totalVendas}</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium">Total em Comissões</h3>
            <p className="text-2xl font-bold">{totalGanhos} AOA</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium">Produtos Promovidos</h3>
            <p className="text-2xl font-bold">{totalProdutos}</p>
          </div>
        </div>

        {/* 📈 Gráfico de Vendas por Produto */}
        {affiliateData.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow mb-8">
            <h3 className="text-lg font-bold mb-4 text-center">📊 Desempenho por Produto</h3>
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}

        {/* 📋 Tabela Detalhada */}
        {affiliateData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left text-sm sm:text-base">Produto</th>
                  <th className="p-3 text-left text-sm sm:text-base">Ganhos</th>
                  <th className="p-3 text-left text-sm sm:text-base">Total de Vendas</th>
                  <th className="p-3 text-left text-sm sm:text-base">Link de Afiliado</th>
                </tr>
              </thead>
              <tbody>
                {affiliateData.map((affiliate) => (
                  <tr key={affiliate._id} className="border-t">
                    <td className="p-3 text-sm sm:text-base">{affiliate.product}</td>
                    <td className="p-3 text-sm sm:text-base">{affiliate.totalEarnings} AOA</td>
                    <td className="p-3 text-sm sm:text-base">{affiliate.totalSales}</td>
                    <td className="p-3 text-sm sm:text-base break-all">
                      <a
                        href={affiliate.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Acessar
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600">
            Nenhuma venda ainda. Compartilhe seu link e comece a ganhar!
          </p>
        )}
      </div>
    </div>
  );
}
