import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Obrigado() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      {status === "success" ? (
        <>
          <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Pagamento Aprovado!</h1>
          <p className="text-gray-700">Obrigado pela sua compra. Seu pedido será processado em breve.</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Pagamento Falhou</h1>
          <p className="text-gray-700">Algo deu errado. Tente novamente ou entre em contato com o vendedor.</p>
        </>
      )}
    </div>
  );
}
