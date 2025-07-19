import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TodosProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products/publicos");
        setProdutos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar produtos públicos:", error);
      }
    };
    carregarProdutos();
  }, []);

  return (
    <div className="mt-14">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        🛒 Todos os Produtos
      </h2>

      {produtos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto disponível no momento.</p>
      ) : (
        <div className="flex overflow-x-auto gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-6 sm:overflow-visible">
          {produtos.map((produto) => (
            <div
              key={produto._id}
              className="min-w-[240px] sm:min-w-0 bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex-shrink-0"
            >
              <img
                src={produto.image}
                alt={produto.name}
                className="w-full h-44 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-3 line-clamp-1">{produto.name}</h3>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">{produto.description}</p>
              <p className="text-blue-700 font-bold mt-2">Kz {produto.price}</p>
              <Link
                to={`/produto/${produto._id}`}
                className="block mt-3 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Ver detalhes
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
