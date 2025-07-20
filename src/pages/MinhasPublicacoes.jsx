import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MinhasPublicacoes = () => {
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (!token) return navigate('/login');

    const fetchMeusClipes = async () => {
      try {
        const res = await axios.get(`${API}/api/clips/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClips(res.data.data || []);
      } catch (err) {
        console.error('Erro ao carregar seus clipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeusClipes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente excluir este clipe?')) return;
    try {
      await axios.delete(`${API}/api/clips/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClips((prev) => prev.filter((clip) => clip._id !== id));
    } catch (err) {
      console.error('Erro ao deletar clipe:', err);
      alert("Erro ao deletar. Tente novamente.");
    }
  };

  const copiarLink = (url) => {
    const linkCompleto = `${API}${url}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(linkCompleto)
        .then(() => alert('✅ Link copiado para a área de transferência!'))
        .catch(() => alert('❌ Não foi possível copiar o link.'));
    } else {
      alert('Seu navegador não suporta cópia automática.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">🎥 Minhas Publicações</h2>
        <button
          onClick={() => navigate('/painel-clipes')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          📈 Ver Painel de Estatísticas
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">🔄 Carregando seus clipes...</p>
      ) : clips.length === 0 ? (
        <p className="text-gray-500">🚫 Você ainda não publicou nenhum clipe.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clips.map((clip) => (
            <div key={clip._id} className="bg-white rounded-lg shadow-md p-4">
              <video
                src={`${API}${clip.videoUrl}`}
                controls
                className="w-full h-48 rounded mb-2"
              />

              <p className="text-sm text-gray-600 mb-1">
                <strong>Produto:</strong>{' '}
                <a
                  href={clip.productLink}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Produto
                </a>
              </p>

              <p className="text-sm text-gray-500 mb-3">
                ❤️ {clip.likes || 0} | 📤 {clip.shares || 0}
              </p>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate(`/editar-clipe/${clip._id}`)}
                  className="bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition"
                >
                  ✏️ Editar
                </button>

                <button
                  onClick={() => copiarLink(clip.videoUrl)}
                  className="bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 transition"
                >
                  🔗 Copiar Link do Vídeo
                </button>

                <button
                  onClick={() => handleDelete(clip._id)}
                  className="bg-red-600 text-white py-1 rounded hover:bg-red-700 transition"
                >
                  🗑️ Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinhasPublicacoes;
