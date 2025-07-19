import { FaQuestionCircle } from "react-icons/fa";

export default function Perguntas() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <FaQuestionCircle className="text-blue-500 text-2xl" />
        <h2 className="text-xl font-bold">❓ Perguntas dos Compradores</h2>
      </div>

      <p className="text-gray-700 mb-4">
        Aqui você verá as perguntas feitas pelos compradores sobre os seus produtos. Responda com agilidade para aumentar suas chances de venda!
      </p>

      <div className="bg-gray-100 p-4 rounded-md text-center text-gray-600">
        Nenhuma pergunta recebida até o momento.
      </div>

      <p className="mt-4 text-sm text-gray-500 italic">
        * Quando um comprador perguntar sobre um produto, ele aparecerá nesta área.
      </p>
    </div>
  );
}
