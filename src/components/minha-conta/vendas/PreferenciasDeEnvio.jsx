import React from "react";
import { FaTruck } from "react-icons/fa";

export default function PreferenciasDeEnvio() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <FaTruck className="text-blue-600 text-2xl" />
        <h2 className="text-xl font-bold">🚚 Preferências de Envio</h2>
      </div>

      <p className="text-gray-700 mb-4">
        Configure suas opções de envio para os produtos vendidos. Defina o método padrão e informe seus prazos de entrega.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Método de Envio Padrão
          </label>
          <select className="w-full p-2 border rounded-md">
            <option>Correios</option>
            <option>Entrega personalizada</option>
            <option>Retirada no local</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prazo estimado de entrega
          </label>
          <input
            type="text"
            placeholder="Ex: 3 a 5 dias úteis"
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="mt-6 text-right">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Salvar Preferências
        </button>
      </div>
    </div>
  );
}
