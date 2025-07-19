import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const MinhasPublicacoes = () => {
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeusClipes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/clips/me', {
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
    if (!window.confirm('Deseja mesmo excluir este clipe?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/clips/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClips((prev) => prev.filter((clip) => clip._id !== id));
    } catch (err) {
      console.error('Erro ao deletar clipe:', err);
    }
  };

  const copiarLink = (url) => {
    navigator.clipboard.writeText(`http://localhost:5000${url}`);
    alert('Link copiado para área de transferência!');
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
        <p className="text-gray-500">Carregando seus clipes...</p>
      ) : clips.length === 0 ? (
        <p className="text-gray-500">Você ainda não publicou nenhum clipe.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clips.map((clip) => (
            <div key={clip._id} className="bg-white rounded-lg shadow-md p-4">
              <video
                src={`http://localhost:5000${clip.videoUrl}`}
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
                ❤️ {clip.likes} | 📤 {clip.shares}
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
