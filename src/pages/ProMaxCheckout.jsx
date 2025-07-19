import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProMaxCheckout = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
        setErro("❌ Produto não encontrado.");
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleCheckout = async () => {
    setErro("");
    setLoading(true);

    try {
      const reference = `PROD-${product._id}-${Date.now()}`;

      const res = await axios.post("http://localhost:5000/api/payment/solicitar-token", {
        reference,
        amount: product.price,
        productId: product._id,
        terminalId: "560", // substitua pelo terminal real EMIS
        callbackUrl: "https://seudominio.com/api/payment/callback",
        cssUrl: "", // ou personalize com seu estilo próprio
      });

      const { token } = res.data;

      if (token) {
        window.location.href = `https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frame?id=${token}`;
      } else {
        setErro("❌ Falha ao gerar link de pagamento.");
      }
    } catch (error) {
      console.error("Erro ao gerar token:", error);
      setErro("❌ Erro ao iniciar pagamento.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        🔄 Carregando produto...
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <img
          src={
            product.imagens?.[0]?.startsWith("http")
              ? product.imagens[0]
              : `/uploads/produtos/${product.imagens?.[0]}`
          }
          alt={product.name}
          className="w-full h-52 object-cover rounded mb-4 border"
        />

        <h2 className="text-2xl font-bold mb-2 text-blue-700">{product.name}</h2>
        <p className="text-gray-700 mb-3">{product.description}</p>
        <p className="text-lg font-semibold text-green-600 mb-4">
          💰 Preço: {product.price} AOA
        </p>

        {erro && <p className="text-red-600 mb-4">{erro}</p>}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full py-3 rounded-md text-white text-lg font-semibold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "🔄 Processando..." : "💳 Pagar com ProMaxPay"}
        </button>
      </div>
    </div>
  );
};

export default ProMaxCheckout;
