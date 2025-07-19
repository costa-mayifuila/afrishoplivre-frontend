import { FaHeadset } from "react-icons/fa";

export default function AtendimentoPosVenda() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <FaHeadset className="text-blue-600 text-2xl" />
        <h2 className="text-xl font-bold">Atendimento Pós-venda</h2>
      </div>

      <p className="text-gray-700 mb-4">
        Resolva dúvidas, reclamações ou problemas após a venda ser concluída. Aqui você poderá:
      </p>

      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        <li>Responder mensagens de clientes</li>
        <li>Gerenciar devoluções ou trocas</li>
        <li>Acompanhar avaliações e comentários</li>
        <li>Oferecer suporte direto por e-mail ou WhatsApp</li>
      </ul>

      <div className="mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Ver Mensagens de Clientes
        </button>
      </div>
    </div>
  );
}
