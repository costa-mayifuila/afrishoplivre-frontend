import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await axios.get("/api/orders/meus");
        setPedidos(data);
      } catch (err) {
        console.error("Erro ao carregar pedidos:", err);
      }
    };
    carregar();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-bold text-purple-700 mb-4">📦 Meus Pedidos</h2>

      {pedidos.length === 0 ? (
        <p>Você ainda não fez nenhuma compra.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {pedidos.map((pedido) => (
            <div key={pedido._id} className="border p-4 rounded">
              <div className="flex items-center gap-4">
                <img
                  src={pedido.produto?.imagens?.[0]}
                  alt={pedido.produto?.nome}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{pedido.produto?.nome}</p>
                  <p className="text-sm text-gray-600">Kz {pedido.valor}</p>
                  <p className="text-sm text-green-600">Status: {pedido.status}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(pedido.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
