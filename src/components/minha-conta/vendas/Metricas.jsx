import { FaChartLine } from "react-icons/fa";

export default function Metricas() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-blue-600 text-2xl" />
        <h2 className="text-xl font-bold">📊 Métricas de Desempenho</h2>
      </div>

      <p className="text-gray-700 mb-4">
        Acompanhe os principais indicadores das suas vendas, anúncios e reputação para melhorar seus resultados na plataforma.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold text-blue-800">Total de Vendas</h3>
          <p className="text-2xl font-bold mt-2">125</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold text-green-800">Taxa de Conversão</h3>
          <p className="text-2xl font-bold mt-2">8.5%</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold text-yellow-800">Reputação</h3>
          <p className="text-2xl font-bold mt-2">⭐ 4.7</p>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        * As métricas exibidas acima são estimativas baseadas em dados recentes.
      </div>
    </div>
  );
}
