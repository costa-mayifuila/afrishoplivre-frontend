import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListarAnuncios() {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const { data } = await axios.get("/api/ads/meus");
        setAds(data);
      } catch (err) {
        setError("Erro ao carregar anúncios.");
      }
    };

    fetchAds();
  }, []);

  const handleToggleStatus = async (adId, currentStatus) => {
    try {
      const newStatus = currentStatus === "ativo" ? "inativo" : "ativo";
      const { data: updatedAd } = await axios.patch(`/api/ads/${adId}`, {
        status: newStatus,
      });
      setAds(ads.map((ad) => (ad._id === adId ? updatedAd : ad)));
    } catch (err) {
      setError("Erro ao atualizar o status do anúncio.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Meus Anúncios</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {ads.length === 0 ? (
        <p className="text-gray-700">Nenhum anúncio encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {ads.map((ad) => (
            <div key={ad._id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <img
                  src={ad.imagemUrl}
                  alt={ad.produto}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{ad.produto}</p>
                  <p className="text-sm text-gray-600">Tipo: {ad.tipo}</p>
                  <p className="text-sm text-gray-600">Status: {ad.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/editar-anuncio/${ad._id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    ad.status === "ativo"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white`}
                  onClick={() => handleToggleStatus(ad._id, ad.status)}
                >
                  {ad.status === "ativo" ? "Desativar" : "Ativar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
