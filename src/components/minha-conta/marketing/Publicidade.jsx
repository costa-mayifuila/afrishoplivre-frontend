import React from "react";
import { FaBullhorn, FaPlus, FaChartPie, FaLightbulb } from "react-icons/fa";

export default function Publicidade() {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-4xl w-full">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">📢 Publicidade</h2>
      <p className="text-gray-700 mb-6">
        Invista em campanhas de anúncios para alcançar mais compradores, destacar seus produtos e aumentar suas vendas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Criar Anúncio */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaPlus className="text-purple-600" />
            <h3 className="text-lg font-semibold">Criar Novo Anúncio</h3>
          </div>
          <p className="text-sm text-gray-700">
            Promova um produto com banner na página inicial, destaque nas categorias ou campanhas segmentadas.
          </p>
          <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Criar Anúncio
          </button>
        </div>

        {/* Análise de Resultados */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaChartPie className="text-blue-600" />
            <h3 className="text-lg font-semibold">Desempenho da Publicidade</h3>
          </div>
          <p className="text-sm text-gray-700">
            Veja o número de impressões, cliques e conversões das suas campanhas ativas.
          </p>
          <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Ver Relatórios
          </button>
        </div>

        {/* Dicas de Publicidade */}
        <div className="md:col-span-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaLightbulb className="text-yellow-600" />
            <h3 className="text-lg font-semibold">💡 Dicas de Publicidade</h3>
          </div>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            <li>Use imagens de alta qualidade e chamadas atrativas.</li>
            <li>Promova produtos com maior margem de lucro ou alto estoque.</li>
            <li>Segmente sua audiência com base na categoria ou região.</li>
            <li>Teste diferentes formatos e horários de veiculação.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
