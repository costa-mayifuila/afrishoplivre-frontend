import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CheckoutProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEscolher = (metodo) => {
    navigate(`/pagamento/${metodo}/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        🛍️ Escolha sua forma de pagamento
      </h2>

      <div className="grid gap-4">
        <button
          onClick={() => handleEscolher('multicaixa')}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          💳 Multicaixa Express
        </button>

        <button
          onClick={() => handleEscolher('transferencia')}
          className="w-full bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600 transition"
        >
          🏦 Transferência Bancária
        </button>

        <button
          onClick={() => handleEscolher('deposito')}
          className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition"
        >
          💰 Depósito Bancário
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduto;
