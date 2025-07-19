import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditarPromocao() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState("");
  const [desconto, setDesconto] = useState("");
  const [validade, setValidade] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await axios.get(`/api/promocoes/minhas`);
        const promo = data.find((p) => p._id === id);
        if (!promo) return setMensagem("Promoção não encontrada.");
        setProduto(promo.produto);
        setDesconto(promo.desconto);
        setValidade(promo.validade.split("T")[0]); // formato yyyy-mm-dd
      } catch {
        setMensagem("Erro ao carregar promoção.");
      }
    };
    carregar();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/promocoes/${id}`, { produto, desconto, validade });
      setMensagem("✅ Promoção atualizada!");
      setTimeout(() => navigate("/minhas-promocoes"), 1500);
    } catch {
      setMensagem("❌ Erro ao salvar alteração.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl w-full mx-auto">
      <h2 className="text-xl font-bold mb-4 text-pink-700">✏️ Editar Promoção</h2>
      {mensagem && <p className="text-center font-semibold mb-4">{mensagem}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full border px-4 py-2 rounded"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          placeholder="Produto"
        />
        <input
          type="number"
          className="w-full border px-4 py-2 rounded"
          value={desconto}
          onChange={(e) => setDesconto(e.target.value)}
          placeholder="Desconto (%)"
        />
        <input
          type="date"
          className="w-full border px-4 py-2 rounded"
          value={validade}
          onChange={(e) => setValidade(e.target.value)}
        />
        <button className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
