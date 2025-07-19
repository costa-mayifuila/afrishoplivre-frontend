import { FaStore } from "react-icons/fa";

export default function CentralDeVendedores() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <FaStore className="text-green-600 text-2xl" />
        <h2 className="text-xl font-bold">Central de Vendedores</h2>
      </div>

      <p className="text-gray-700 mb-4">
        Bem-vindo ao seu centro de controle! Aqui você pode acessar todas as ferramentas necessárias para gerenciar suas vendas com eficiência:
      </p>

      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        <li>Acompanhar desempenho de vendas</li>
        <li>Publicar novos produtos</li>
        <li>Gerenciar anúncios ativos</li>
        <li>Visualizar métricas e reputação</li>
        <li>Configurar preferências de envio</li>
        <li>Atender dúvidas e solicitações de clientes</li>
      </ul>

      <div className="mt-6">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Ir para Dashboard de Vendas
        </button>
      </div>
    </div>
  );
}
