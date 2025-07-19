import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function TesteConexao() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("carregando"); // sucesso | erro | carregando

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await api.get("/");
        setMessage(res.data || "Conexão bem-sucedida!");
        setStatus("sucesso");
      } catch (error) {
        console.error("Erro ao conectar com o backend:", error);
        setMessage("❌ Erro na conexão com o backend.");
        setStatus("erro");
      }
    };
    fetchMessage();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">🔌 Teste de Conexão</h1>
        <p
          className={`text-lg font-semibold ${
            status === "sucesso"
              ? "text-green-600"
              : status === "erro"
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {status === "carregando" ? "Verificando conexão..." : message}
        </p>
      </div>
    </div>
  );
}
