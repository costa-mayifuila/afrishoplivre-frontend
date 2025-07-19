import React, { useEffect, useState } from "react";
import { FaShoppingBag, FaDollarSign, FaChartBar } from "react-icons/fa";
import api from "../api/api";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // Simulando dados da API
    const fetchData = async () => {
      const mockOrders = [
        { id: 1, name: "Produto 1", amount: 5000, status: "Entregue" },
        { id: 2, name: "Produto 2", amount: 7000, status: "Pendente" },
        { id: 3, name: "Produto 3", amount: 10000, status: "Enviado" }
      ];
      setOrders(mockOrders);
      setTotalSales(mockOrders.length);
      setTotalRevenue(mockOrders.reduce((acc, order) => acc + order.amount, 0));
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-blue-800 text-center">
          📊 Painel do Vendedor
        </h2>

        {/* 📦 Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <FaShoppingBag size={30} />
            <div>
              <h3 className="text-lg font-semibold">Total de Vendas</h3>
              <p className="text-2xl font-bold">{totalSales}</p>
            </div>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <FaDollarSign size={30} />
            <div>
              <h3 className="text-lg font-semibold">Total de Ganhos</h3>
              <p className="text-2xl font-bold">{totalRevenue} AOA</p>
            </div>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <FaChartBar size={30} />
            <div>
              <h3 className="text-lg font-semibold">Pedidos Pendentes</h3>
              <p className="text-2xl font-bold">
                {orders.filter(order => order.status === "Pendente").length}
              </p>
            </div>
          </div>
        </div>

        {/* 📋 Últimos Pedidos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">📦 Últimos Pedidos</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Produto</th>
                  <th className="p-3 text-left">Valor</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b">
                    <td className="p-3">{order.name}</td>
                    <td className="p-3">{order.amount} AOA</td>
                    <td className={`p-3 font-semibold ${order.status === "Pendente" ? "text-red-500" : "text-green-600"}`}>
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

