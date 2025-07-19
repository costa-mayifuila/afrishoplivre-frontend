import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutPending = () => {
  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-4">
          ⏳ Pagamento Pendente
        </h1>
        <p className="text-gray-700 mb-6">
          Seu pagamento está sendo processado. Você receberá a confirmação em breve.
        </p>

        <Link
          to="/"
          className="inline-block bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600 transition"
        >
          Voltar para Início
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPending;
