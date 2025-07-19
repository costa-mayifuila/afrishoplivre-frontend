import React, { useEffect, useState } from "react";
import api from "../../../api/api"; // ajuste o caminho se necessário

export default function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await api.get("/orders/minhas-vendas", config);
        setVendas(res.data);
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendas();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-4xl w-full">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">🧾 Vendas Realizadas</h2>
      <p className="text-gray-700 mb-6">Acompanhe suas vendas e o status de cada pedido.</p>

      {loading ? (
        <p>Carregando...</p>
      ) : vendas.length === 0 ? (
        <div className="text-gray-500">Você ainda não realizou vendas.</div>
      ) : (
        <ul className="space-y-4">
          {vendas.map((venda) => (
            <li key={venda._id} className="p-4 border rounded-lg shadow-sm">
              <p className="font-semibold">
                Pedido #{venda._id.slice(-6)} — {venda.totalAmount} AOA
              </p>
              <p className="text-sm text-gray-600">Status: {venda.status}</p>
              <ul className="mt-2 text-sm list-disc pl-4 text-gray-800">
                {venda.items.map((item, i) => (
                  <li key={i}>
                    {item.productName} × {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
