import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [produto, setProduto] = useState(null);
  const [erroProduto, setErroProduto] = useState("");

  useEffect(() => {
    if (id) {
      const fetchProduto = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/publico/produto/${id}`);
          setProduto(res.data);
        } catch (err) {
          setErroProduto("❌ Produto não encontrado.");
        }
      };
      fetchProduto();
    }
  }, [id]);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const reference = String(Date.now());

      const valor = id
        ? produto?.price || 0
        : cart.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
      const amount = Math.round(Number(valor));

      if (!reference || isNaN(amount) || amount <= 0) {
        alert("❌ Erro ao preparar os dados da compra.");
        setLoading(false);
        return;
      }

      const payload = {
        reference,
        amount,
        callbackUrl: `http://localhost:5000/api/gpo/callback`,
        productId: id || "CART",
        productName: id ? produto?.name || "Produto" : "Carrinho de Compras",
      };

      const cssUrl = `${window.location.origin}/css/checkout.css`;
      if (cssUrl.startsWith("https://")) {
        payload.cssUrl = cssUrl;
      }

      const res = await axios.post(
        "http://localhost:5000/api/gpo/solicitar-token",
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const redirectUrl = res.data?.redirectUrl;
      if (!redirectUrl) {
        throw new Error("❌ URL de redirecionamento não recebida da EMIS");
      }

      clearCart();
      window.location.href = redirectUrl;

    } catch (err) {
      console.error("❌ Erro ao finalizar compra:", err?.response?.data || err.message);
      alert("❌ Erro ao finalizar a compra. Tente novamente.");
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
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-800 text-center">
          🧾 Finalizar Compra
        </h1>

        {id && (
          <div className="mb-6">
            {erroProduto ? (
              <p className="text-red-500 text-center">{erroProduto}</p>
            ) : produto ? (
              <div className="text-center">
                <p className="text-lg font-semibold">{produto.name}</p>
                <p className="text-gray-600">
                  Preço: {formatarAOA(produto.price)}
                </p>
              </div>
            ) : (
              <p className="text-center text-gray-500">🔄 Carregando produto...</p>
            )}
          </div>
        )}

        {!id && cart.length > 0 && (
          <ul className="mb-6 divide-y">
            {cart.map((item) => (
              <li key={item._id} className="py-2 flex justify-between text-sm sm:text-base">
                <span>{item.name}</span>
                <span className="font-semibold">
                  {formatarAOA(item.price)} x {item.qty}
                </span>
              </li>
            ))}
            <li className="pt-3 text-right text-green-700 font-bold">
              Total:{" "}
              {formatarAOA(
                cart.reduce((acc, item) => acc + item.price * item.qty, 0)
              )}
            </li>
          </ul>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full py-3 rounded text-white font-bold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Processando..." : "💳 Finalizar Compra com Multicaixa Express"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
