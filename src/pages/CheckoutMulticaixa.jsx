import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CheckoutMulticaixa = () => {
  const { id } = useParams();
  const [mensagem, setMensagem] = useState("Iniciando pagamento...");

  useEffect(() => {
    const iniciarPagamento = async () => {
      try {
        const token = localStorage.getItem("token");
        const resProduto = await axios.get(`/api/publico/produto/${id}`);
        const produto = resProduto.data;

        const reference = `${Date.now()}`;
        const payload = {
          reference,
          amount: Math.round(produto.preco),
          cssUrl: `${window.location.origin}/css/checkout.css`,
          callbackUrl: `${window.location.origin}/api/gpo/callback`,
          productId: produto._id,
          productName: produto.nome,
        };

        const resposta = await axios.post("/api/gpo/solicitar-token", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const redirectUrl = resposta.data?.data?.redirectUrl;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          setMensagem("❌ Erro ao gerar link de pagamento.");
        }
      } catch (err) {
        console.error(err);
        setMensagem("❌ Erro ao iniciar pagamento.");
      }
    };

    iniciarPagamento();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg text-gray-700">{mensagem}</p>
    </div>
  );
};

export default CheckoutMulticaixa;
