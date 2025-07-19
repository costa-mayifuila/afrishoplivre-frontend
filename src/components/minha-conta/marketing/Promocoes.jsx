import React from "react";
import { FaTags, FaChartLine, FaPlusCircle } from "react-icons/fa";

export default function Promocoes() {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-4xl w-full">
      <h2 className="text-2xl font-bold mb-4 text-pink-700">🎯 Promoções</h2>
      <p className="text-gray-700 mb-6">
        Crie ofertas especiais, descontos relâmpago ou campanhas semanais para destacar seus produtos e impulsionar suas vendas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Criar Promoção */}
        <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaPlusCircle className="text-pink-600" />
            <h3 className="text-lg font-semibold">Nova Promoção</h3>
          </div>
          <p className="text-sm text-gray-700">
            Selecione um produto, defina o valor do desconto e escolha o período de validade.
          </p>
          <button className="mt-3 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
            Criar Promoção
          </button>
        </div>

        {/* Estatísticas de Desempenho */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaChartLine className="text-yellow-600" />
            <h3 className="text-lg font-semibold">Desempenho das Promoções</h3>
          </div>
          <p className="text-sm text-gray-700">
            Acompanhe o número de cliques, visualizações e conversões em cada promoção ativa.
          </p>
          <button className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
            Ver Relatório
          </button>
        </div>

        {/* Dicas para Promover */}
        <div className="md:col-span-2 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaTags className="text-blue-500" />
            <h3 className="text-lg font-semibold">Dicas de Promoção</h3>
          </div>
          <ul className="list-disc ml-6 text-sm text-gray-600">
            <li>Ofereça descontos de tempo limitado para criar senso de urgência.</li>
            <li>Use imagens atrativas e descrições claras.</li>
            <li>Compartilhe as promoções nas redes sociais e grupos de interesse.</li>
            <li>Experimente combos ou brindes para aumentar o valor percebido.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
