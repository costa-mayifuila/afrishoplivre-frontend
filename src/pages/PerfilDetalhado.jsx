import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PerfilDetalhado = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const res = await axios.get('http://localhost:5000/api/users/me', config);
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data?.msg || "Erro ao buscar perfil");
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  if (loading) return <div className="text-center mt-10 text-gray-600">🔄 Carregando perfil...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">👤 Perfil do Usuário</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              value={user.name}
              readOnly
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              readOnly
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerfilDetalhado;
