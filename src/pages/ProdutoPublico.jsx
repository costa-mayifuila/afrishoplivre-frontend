import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProdutoPublico() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await axios.get(`/api/publico/produto/${id}`);
        setProduto(data);
      } catch (err) {
        console.error("Erro ao carregar produto:", err);
      }
    };
    carregar();
  }, [id]);

  if (!produto) return <p className="p-6 text-center">Carregando produto...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={produto.imagens?.[0]}
          alt={produto.nome}
          className="w-full h-64 object-cover rounded"
        />

        <div>
          <h2 className="text-2xl font-bold text-purple-700 mb-2">{produto.nome}</h2>
          <p className="text-gray-700 mb-4">{produto.descricao}</p>
          <p className="text-lg text-green-700 font-semibold mb-4">Kz {produto.preco}</p>

          <button
            onClick={() => navigate(`/checkout/${produto._id}`)}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Comprar agora
          </button>
        </div>
      </div>
    </div>
  );
}
