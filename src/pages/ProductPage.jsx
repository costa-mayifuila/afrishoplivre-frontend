import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function ProductPage() {
  const { id } = useParams();
  const ref = new URLSearchParams(window.location.search).get("ref");
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarProduto = async () => {
      try {
        
        const { data } = await api.get(`/products/${id}`);

        setProduto(data);
      } catch (error) {
        console.error("❌ Produto não encontrado:", error.response?.data || error.message);
        setProduto(null);
      } finally {
        setCarregando(false);
      }
    };
    buscarProduto();
  }, [id]);

  const handleBuy = async () => {
    try {
      await api.post("/orders", {
        items: [{ product: id, quantity: 1 }],
        totalAmount: produto.price,
        paymentMethod: "cartao",
        ref,
      });
      alert("✅ Compra realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao comprar:", error.response?.data || error.message);
      alert("❌ Erro ao comprar produto.");
    }
  };

  if (carregando)
    return (
      <p className="text-center py-10 text-blue-600 font-semibold">⏳ Carregando produto...</p>
    );

  if (!produto)
    return (
      <p className="text-center py-10 text-red-600 font-semibold text-xl">
        ❌ Produto não encontrado.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white max-w-xl w-full p-6 rounded-lg shadow-md">
        <img
          src={produto.image || "/img/sem-imagem.png"}
          alt={produto.name}
          className="w-full h-60 object-cover rounded mb-4"
          onError={(e) => (e.target.src = "/img/sem-imagem.png")}
        />

        <h1 className="text-3xl font-bold text-blue-700 mb-2">{produto.name}</h1>

        {ref && (
          <p className="text-sm text-gray-500 mb-1">
            Afiliado: <span className="font-medium">{ref}</span>
          </p>
        )}

        <p className="text-gray-700 mb-4">{produto.description}</p>

        <p className="text-lg font-bold mb-4">
          💰 Kz {Number(produto.price).toLocaleString("pt-AO")}
        </p>

        <button
          onClick={handleBuy}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition text-lg"
        >
          🛒 Comprar Agora
        </button>
      </div>
    </div>
  );
}
