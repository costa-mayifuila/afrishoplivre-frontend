import React from "react";
import { FaDollarSign, FaShoppingCart, FaSmile } from "react-icons/fa";

export default function Resumo() {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-4xl w-full">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">📊 Resumo das Vendas</h2>
      <p className="text-gray-700 mb-6">
        Aqui você verá o resumo das suas vendas e desempenho geral.
      </p>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow flex items-center gap-4">
          <FaShoppingCart className="text-3xl text-blue-600" />
          <div>
            <p className="text-gray-600 text-sm">Vendas Totais</p>
            <h3 className="text-xl font-bold text-blue-800">58</h3>
          </div>
        </div>

        <div className="bg-green-100 p-4 rounded-lg shadow flex items-center gap-4">
          <FaDollarSign className="text-3xl text-green-600" />
          <div>
            <p className="text-gray-600 text-sm">Ganhos Acumulados</p>
            <h3 className="text-xl font-bold text-green-800">234.500 AOA</h3>
          </div>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg shadow flex items-center gap-4">
          <FaSmile className="text-3xl text-yellow-600" />
          <div>
            <p className="text-gray-600 text-sm">Clientes Satisfeitos</p>
            <h3 className="text-xl font-bold text-yellow-800">97%</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
