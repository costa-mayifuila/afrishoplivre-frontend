import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarClip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productLink, setProductLink] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [newVideo, setNewVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [mensagem, setMensagem] = useState('');

  const token = localStorage.getItem('token');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchClip = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/clips`);
        const clip = res.data?.data?.find((c) => c._id === id);
        if (clip) {
          setProductLink(clip.productLink || '');
          setVideoUrl(`${API_URL}${clip.videoUrl}`);
        } else {
          setMensagem('❌ Clipe não encontrado.');
        }
      } catch (err) {
        console.error('Erro ao buscar clipe:', err);
        setMensagem('❌ Erro ao carregar dados do clipe.');
      }
    };

    fetchClip();
  }, [id]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewVideo(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    if (!token) {
      setMensagem('⚠️ Você precisa estar logado para editar clipes.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('productLink', productLink);
      if (newVideo) formData.append('video', newVideo);

      await axios.put(`${API_URL}/api/clips/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMensagem('✅ Clipe atualizado com sucesso!');
      setTimeout(() => navigate('/minhas-publicacoes'), 2000);
    } catch (err) {
      console.error('Erro ao atualizar clipe:', err);
      setMensagem('❌ Erro ao atualizar o clipe.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">✏️ Editar Clipe</h2>

      {mensagem && (
        <p
          className={`mb-4 text-sm ${
            mensagem.startsWith('✅') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {mensagem}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">🔗 Link do Produto</label>
          <input
            type="text"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
            className="mt-1 w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">📤 Substituir vídeo (opcional)</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="mt-1"
          />
        </div>

        {(previewUrl || videoUrl) && (
          <video
            src={previewUrl || videoUrl}
            controls
            className="w-full h-64 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          💾 Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default EditarClip;
