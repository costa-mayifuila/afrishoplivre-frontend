import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EscolherPagamento = () => {
  const { id } = useParams(); // produto._id
  const navigate = useNavigate();

  const handleEscolha = (metodo) => {
    navigate(`/checkout/${metodo}/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          💳 Escolha sua forma de pagamento
        </h2>

        <div className="space-y-4">
          <button
            onClick={() => handleEscolha("multicaixa")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            💳 Multicaixa Express
          </button>
          <button
            onClick={() => handleEscolha("transferencia")}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold"
          >
            🏦 Transferência Bancária
          </button>
          <button
            onClick={() => handleEscolha("deposito")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            💰 Depósito Bancário
          </button>
        </div>
      </div>
    </div>
  );
};

export default EscolherPagamento;
