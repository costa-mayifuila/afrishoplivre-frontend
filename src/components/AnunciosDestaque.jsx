import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AnunciosDestaque() {
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const { data } = await axios.get("/api/publicidade/anuncios");

        // ✅ Proteção: só atualiza se for array
        if (Array.isArray(data)) {
          setAnuncios(data);
        } else {
          console.error("Resposta inesperada da API:", data);
          setAnuncios([]);
        }
      } catch (err) {
        console.error("Erro ao buscar anúncios:", err);
        setAnuncios([]);
      }
    };

    fetchAnuncios();
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 shadow mt-6">
      <h2 className="text-xl font-bold mb-4 text-purple-700">✨ Produtos em Destaque</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(anuncios) && anuncios.length > 0 ? (
          anuncios.map((ad) => (
            <div key={ad._id} className="border p-3 rounded">
              <img
                src={ad.imagemUrl}
                alt={ad.produto}
                className="h-40 w-full object-cover rounded mb-2"
              />
              <p className="font-semibold">{ad.produto}</p>
              <p className="text-sm text-gray-500">Kz {ad.orcamento}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            Nenhum anúncio disponível no momento.
          </p>
        )}
      </div>
    </div>
  );
}
