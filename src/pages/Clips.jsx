import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

const Clips = () => {
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchClips = async () => {
      try {
        const res = await axios.get(`${API_URL}/clips`);
        const data = res.data?.data || res.data;
        setClips(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err.response?.data?.msg || err.message);
        setClips([]);
      } finally {
        setLoading(false);
      }
    };
    fetchClips();
  }, []);

  const handleLike = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return alert("⚠️ Faça login para curtir.");

    try {
      await axios.post(`${API_URL}/clips/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setClips((prev) =>
        prev.map((clip) =>
          clip._id === id ? { ...clip, likes: (clip.likes || 0) + 1 } : clip
        )
      );
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
    }
  };

  const handleShare = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return alert("⚠️ Faça login para compartilhar.");

    try {
      await axios.post(`${API_URL}/clips/${id}/share`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setClips((prev) =>
        prev.map((clip) =>
          clip._id === id ? { ...clip, shares: (clip.shares || 0) + 1 } : clip
        )
      );
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-blue-800">
        🎬 Clipes Promocionais
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">🔄 Carregando clipes...</p>
      ) : clips.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum clipe disponível.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {clips.map((clip) => (
            <div
              key={clip._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <video
                src={`${BASE_URL}${clip.videoUrl}`}
                controls
                className="w-full h-64 object-cover rounded mb-4"
              />

              <Link
                to={`/checkout/${clip._id}`}
                className="w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition mb-4"
              >
                Comprar Agora
              </Link>

              <div className="flex justify-between items-center w-full">
                <button
                  onClick={() => handleLike(clip._id)}
                  className="text-pink-600 font-medium hover:text-pink-700"
                >
                  ❤️ {clip.likes || 0}
                </button>

                <div className="flex gap-2 items-center">
                  <FacebookShareButton
                    url={`${BASE_URL}${clip.videoUrl}`}
                    onClick={() => handleShare(clip._id)}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>

                  <TwitterShareButton
                    url={`${BASE_URL}${clip.videoUrl}`}
                    onClick={() => handleShare(clip._id)}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>

                  <WhatsappShareButton
                    url={`${BASE_URL}${clip.videoUrl}`}
                    onClick={() => handleShare(clip._id)}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clips;
