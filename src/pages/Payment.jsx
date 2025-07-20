import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para realizar um pagamento.');
      return navigate('/login');
    }

    if (!/^\d+$/.test(phone)) {
      return alert('Digite apenas números no telefone.');
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      await axios.post(`${API}/api/payment`, { phone, amount, reference }, config);
      alert('✅ Pagamento iniciado com sucesso!');
      navigate('/');
    } catch (err) {
      console.error("Erro ao iniciar pagamento:", err.response?.data?.msg || err.message);
      alert(err.response?.data?.msg || "Erro ao iniciar o pagamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">💳 Iniciar Pagamento</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Número de Telefone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: 923000000"
              required
              pattern="[0-9]+"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Valor (AOA)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ex: 5000"
              required
              min="1"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
              Referência
            </label>
            <input
              type="text"
              id="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Ex: pedido123"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded-md transition`}
          >
            {loading ? 'Processando...' : 'Confirmar Pagamento'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
