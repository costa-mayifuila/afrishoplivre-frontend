import React, { useState } from "react";
import axios from "axios";

export default function CriarPromocao() {
  const [produto, setProduto] = useState("");
  const [desconto, setDesconto] = useState("");
  const [validade, setValidade] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/promocoes", {
        produto,
        desconto,
        validade,
      });
      setMensagem("✅ Promoção criada com sucesso!");
      setProduto("");
      setDesconto("");
      setValidade("");
    } catch (err) {
      setMensagem("❌ Erro ao criar promoção.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl w-full mx-auto">
      <h2 className="text-xl font-bold mb-4 text-pink-700">🛍️ Criar Promoção</h2>

      {mensagem && <p className="mb-4 text-center font-semibold">{mensagem}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full border px-4 py-2 rounded"
          placeholder="Nome ou ID do Produto"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
        />
        <input
          type="number"
          className="w-full border px-4 py-2 rounded"
          placeholder="Desconto (%)"
          value={desconto}
          onChange={(e) => setDesconto(e.target.value)}
        />
        <input
          type="date"
          className="w-full border px-4 py-2 rounded"
          placeholder="Data de Validade"
          value={validade}
          onChange={(e) => setValidade(e.target.value)}
        />

        <button className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
          Publicar Promoção
        </button>
      </form>
    </div>
  );
}
