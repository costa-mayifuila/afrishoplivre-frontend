import React, { useState } from 'react';
import axios from 'axios';

const EnviarClip = () => {
  const [video, setVideo] = useState(null);
  const [productLink, setProductLink] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('token');

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    if (!token) {
      setMensagem('⚠️ Você precisa estar logado para enviar clipes.');
      return;
    }

    if (!video || !productLink) {
      setMensagem('❌ Preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('video', video);
      formData.append('productLink', productLink);

      await axios.post(`${API_URL}/api/clips`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMensagem('✅ Clipe enviado com sucesso!');
      setVideo(null);
      setProductLink('');
      setPreviewUrl('');
    } catch (err) {
      console.error(err);
      setMensagem('❌ Erro ao enviar o clipe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">📤 Enviar Novo Clipe</h2>

      {mensagem && (
        <p
          className={`mb-4 text-sm ${
            mensagem.startsWith('✅')
              ? 'text-green-600'
              : mensagem.startsWith('⚠️')
              ? 'text-yellow-600'
              : 'text-red-600'
          }`}
        >
          {mensagem}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">🎥 Vídeo (mp4, webm...)</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="mt-1 w-full border p-2 rounded"
            required
          />
        </div>

        {previewUrl && (
          <video
            src={previewUrl}
            controls
            className="w-full h-64 object-cover rounded mt-4"
          />
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">🔗 Link do Produto</label>
          <input
            type="text"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
            placeholder="https://afrishoplivre.com/produto/..."
            className="mt-1 w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? '⏳ Enviando...' : '🚀 Publicar Clipe'}
        </button>
      </form>
    </div>
  );
};

export default EnviarClip;

