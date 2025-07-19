import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutFailure = () => {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-700 mb-4">
          ❌ Falha no Pagamento
        </h1>
        <p className="text-gray-600 mb-6">Ocorreu um erro durante o processo de pagamento. Por favor, tente novamente.</p>
        
        <Link
          to="/checkout"
          className="inline-block bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
        >
          Tentar Novamente
        </Link>
      </div>
    </div>
  );
};

export default CheckoutFailure;
