import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function CheckoutUnificado() {
  const { id } = useParams(); // ID do produto individual
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  // 🔄 Carrega o produto individual
  useEffect(() => {
    const carregarProduto = async () => {
      try {
        const res = await axios.get(`/api/publico/produto/${id}`);
        setProduto(res.data);
      } catch (err) {
        setMensagem("❌ Produto não encontrado.");
      }
    };

    if (id) carregarProduto();
  }, [id]);

  // 💳 Processa o pagamento
  const handleCheckout = async () => {
    setLoading(true);
    setMensagem("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("⚠️ Faça login para continuar.");
        navigate("/login");
        return;
      }

      const reference = `${Date.now()}`; // ✅ Apenas números
      const rawAmount = id
        ? produto?.preco || 0
        : cart.reduce((acc, item) => acc + (item.preco || 0), 0);
      const amount = Math.round(rawAmount);

      if (!reference || isNaN(amount) || amount <= 0) {
        setMensagem("❌ Dados inválidos para pagamento.");
        setLoading(false);
        return;
      }

      const payload = {
        reference,
        amount,
        cssUrl: `${window.location.origin}/css/checkout.css`,
        callbackUrl: `${window.location.origin}/api/gpo/callback`,
        productId: id || null,
        productName: id ? (produto?.nome || "Produto") : "Carrinho"
      };

      console.log("📤 Enviando dados para backend:", payload);

      const res = await axios.post(
        "/api/gpo/solicitar-token",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.data?.redirectUrl) {
        clearCart();
        window.location.href = res.data.data.redirectUrl;
      } else {
        setMensagem("⚠️ Erro ao obter link de pagamento.");
      }

    } catch (err) {
      console.error("❌ Erro ao iniciar pagamento:", err.response?.data || err.message);
      setMensagem("❌ Erro ao iniciar o pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const formatarAOA = (valor) =>
    Number(valor).toLocaleString("pt-AO", {
      style: "currency",
      currency: "AOA",
    });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-purple-700 text-center">
          🧾 Finalizar Compra
        </h2>

        {mensagem && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm border border-red-300 text-center">
            {mensagem}
          </div>
        )}

        {/* Produto individual */}
        {id && produto && (
          <div className="mb-4 flex flex-col items-center">
            <img
              src={
                produto.imagens?.[0]?.startsWith("http")
                  ? produto.imagens[0]
                  : `/uploads/produtos/${produto.imagens?.[0]}`
              }
              alt={produto.nome || "Produto"}
              className="w-full h-64 object-cover rounded border mb-4"
            />
            <h3 className="text-lg font-bold">{produto.nome}</h3>
            <p className="text-gray-600 mb-2">{produto.descricao}</p>
            <p className="text-green-600 font-bold">
              💰 Total: {formatarAOA(produto.preco)}
            </p>
          </div>
        )}

        {/* Carrinho */}
        {!id && cart.length > 0 && (
          <>
            <ul className="mb-6 divide-y">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="py-2 flex justify-between text-sm sm:text-base"
                >
                  <span>{item.nome}</span>
                  <span className="font-semibold">
                    {formatarAOA(item.preco)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-right text-green-700 font-bold text-lg mb-4">
              Total:{" "}
              {formatarAOA(cart.reduce((acc, item) => acc + (item.preco || 0), 0))}
            </p>
          </>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-bold transition text-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
          }`}
        >
          {loading ? "Processando..." : "💳 Pagar com Multicaixa Express"}
        </button>
      </div>
    </div>
  );
}
