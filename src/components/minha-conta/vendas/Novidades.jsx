import { FaBell } from "react-icons/fa";

export default function Novidades() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <FaBell className="text-yellow-500 text-2xl" />
        <h2 className="text-xl font-bold">🔔 Novidades & Atualizações</h2>
      </div>

      <p className="text-gray-700 mb-4">
        Fique por dentro das últimas melhorias da plataforma, novos recursos e comunicados importantes para sua loja!
      </p>

      <ul className="list-disc pl-6 space-y-2 text-gray-800">
        <li>📦 Novo painel para controle de pedidos disponível!</li>
        <li>📊 Ferramenta de métricas e estatísticas agora com gráficos interativos.</li>
        <li>🎯 Sistema de promoções com prazo e destaque ativado para produtos selecionados.</li>
        <li>🛒 Checkout com ProMaxPay totalmente integrado!</li>
        <li>💬 Suporte via chat será lançado nas próximas semanas.</li>
      </ul>

      <p className="mt-6 text-sm text-gray-500">
        * Esta área será atualizada sempre que houver novidades relevantes para vendedores.
      </p>
    </div>
  );
}
