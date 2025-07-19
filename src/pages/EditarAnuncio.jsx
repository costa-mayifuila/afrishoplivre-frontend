import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditarAnuncio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState("");
  const [tipo, setTipo] = useState("");
  const [orcamento, setOrcamento] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    // Carrega os dados do anúncio
    const carregarAnuncio = async () => {
      try {
        const { data } = await axios.get(`/api/ads/${id}`);
        setProduto(data.produto);
        setTipo(data.tipo);
        setOrcamento(data.orcamento);
      } catch {
        setMensagem("Erro ao carregar anúncio.");
      }
    };
    carregarAnuncio();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/ads/${id}`, { produto, tipo, orcamento });
      setMensagem("✅ Anúncio atualizado!");
      setTimeout(() => navigate("/meus-anuncios"), 1500);
    } catch {
      setMensagem("❌ Erro ao atualizar anúncio.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl w-full mx-auto">
      <h2 className="text-xl font-bold mb-4 text-purple-700">✏️ Editar Anúncio</h2>

      {mensagem && <p className="mb-4 text-sm font-semibold text-center">{mensagem}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full border px-4 py-2 rounded"
          placeholder="Produto"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
        />

        <select
          className="w-full border px-4 py-2 rounded"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="destaque">Destaque</option>
          <option value="home">Página inicial</option>
          <option value="segmentado">Segmentado</option>
        </select>

        <input
          type="number"
          className="w-full border px-4 py-2 rounded"
          placeholder="Orçamento (em Kz)"
          value={orcamento}
          onChange={(e) => setOrcamento(e.target.value)}
        />

        <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
