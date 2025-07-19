import React from "react";
import { FaBullhorn, FaChartLine, FaLink, FaPercent } from "react-icons/fa";

export default function CentralDeMarketing() {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-4xl w-full">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">📣 Central de Marketing</h2>
      <p className="text-gray-700 mb-6">
        Gerencie suas campanhas, acompanhe o desempenho dos seus links e otimize suas vendas com promoções.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaBullhorn className="text-blue-600" />
            <h3 className="text-lg font-semibold">Campanhas Ativas</h3>
          </div>
          <p className="text-sm text-gray-600">
            Crie campanhas para divulgar seus produtos com mais alcance e visibilidade.
          </p>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaChartLine className="text-green-600" />
            <h3 className="text-lg font-semibold">Desempenho</h3>
          </div>
          <p className="text-sm text-gray-600">
            Veja quantos cliques, visualizações e conversões cada campanha obteve.
          </p>
        </div>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaPercent className="text-yellow-600" />
            <h3 className="text-lg font-semibold">Promoções e Ofertas</h3>
          </div>
          <p className="text-sm text-gray-600">
            Aplique descontos temporários em produtos e aumente suas vendas.
          </p>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaLink className="text-purple-600" />
            <h3 className="text-lg font-semibold">Links Personalizados</h3>
          </div>
          <p className="text-sm text-gray-600">
            Crie e acompanhe links de afiliados e campanhas com tracking personalizado.
          </p>
        </div>
      </div>
    </div>
  );
}
