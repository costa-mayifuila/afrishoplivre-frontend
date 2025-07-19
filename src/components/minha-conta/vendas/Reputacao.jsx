import React from "react";
import { FaStar } from "react-icons/fa";

export default function Reputacao() {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-3xl w-full">
      <h2 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
        <FaStar className="text-yellow-500" />
        Reputação do Vendedor
      </h2>

      <p className="text-gray-700 mb-4">
        Veja sua reputação com base nas avaliações feitas pelos compradores.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg border">
        <p className="text-sm text-gray-600 mb-2">
          ⭐ Média de Avaliação:
        </p>
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <FaStar key={i} className="text-yellow-400" />
          ))}
          <span className="text-sm ml-2 text-gray-600">(5.0 de 5)</span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <strong>Pedidos Entregues:</strong> 28
          </div>
          <div>
            <strong>Avaliações Positivas:</strong> 27
          </div>
          <div>
            <strong>Reclamações:</strong> 1
          </div>
          <div>
            <strong>Tempo de Resposta:</strong> 3h
          </div>
        </div>
      </div>
    </div>
  );
}
