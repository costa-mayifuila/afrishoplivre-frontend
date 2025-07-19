import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [produto, setProduto] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await axios.get(`/api/publico/produto/${id}`);

        // ✅ Converte o preço para número se estiver como string
        data.price = Number(data.price);
        setProduto(data);
      } catch (err) {
        setMensagem("❌ Produto não encontrado.");
      }
    };

    carregar();
  }, [id]);

 const handleAdicionarAoCarrinho = () => {
  if (!produto) return;

  addToCart({
    _id: produto._id,
    nome: produto.name,
    price: produto.price,
    image:
      produto.images?.[0]?.url?.startsWith("http")
        ? produto.images[0].url
        : `/uploads/produtos/${produto.images?.[0]?.url}`,
  });

  navigate("/cart");
};



  const formatarAOA = (valor) =>
    Number(valor).toLocaleString("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 2,
    });

  if (!produto) {
    return (
      <div className="p-8 text-center text-red-600 text-lg">
        {mensagem || "Carregando..."}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10">
        <div className="flex justify-center items-center">
          <img
            src={
              produto.images?.[0]?.url?.startsWith("http")
                ? produto.images[0].url
                : `/uploads/produtos/${produto.images?.[0]?.url}`
            }
            alt={produto.name}
            className="w-full h-auto max-h-[450px] object-cover rounded-xl shadow-md border"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {produto.name}
            </h1>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {produto.description}
            </p>
            <p className="text-emerald-600 text-3xl font-bold mb-8">
              💰 {formatarAOA(produto.price)}
            </p>
          </div>

          <button
            onClick={handleAdicionarAoCarrinho}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white py-4 rounded-xl text-lg font-semibold shadow-md transition"
          >
            <FaShoppingCart className="text-xl" />
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
