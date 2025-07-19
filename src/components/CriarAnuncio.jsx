import React, { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

export default function CriarAnuncio() {
  const [produto, setProduto] = useState("");
  const [tipo, setTipo] = useState("destaque");
  const [orcamento, setOrcamento] = useState("");
  const [imagem, setImagem] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!produto || !orcamento || !imagem) {
      return setMensagem("Preencha todos os campos e envie uma imagem.");
    }

    const formData = new FormData();
    formData.append("produto", produto);
    formData.append("tipo", tipo);
    formData.append("orcamento", orcamento);
    formData.append("imagem", imagem);

    try {
      const { data } = await axios.post("/api/ads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMensagem("✅ Anúncio criado com sucesso!");
    } catch (err) {
      setMensagem("❌ Erro ao criar o anúncio.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl w-full">
      <h2 className="text-xl font-bold mb-4 text-purple-700">📝 Criar Novo Anúncio</h2>

      {mensagem && (
        <p className="mb-4 text-sm font-semibold text-center">
          {mensagem}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Produto ou link */}
        <input
          type="text"
          placeholder="Produto ou link do produto"
          className="w-full border px-4 py-2 rounded"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
        />

        {/* Tipo de anúncio */}
        <select
          className="w-full border px-4 py-2 rounded"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="destaque">Destaque na categoria</option>
          <option value="home">Banner na página inicial</option>
          <option value="segmentado">Campanha Segmentada</option>
        </select>

        {/* Orçamento */}
        <input
          type="number"
          placeholder="Orçamento (em Kz)"
          className="w-full border px-4 py-2 rounded"
          value={orcamento}
          onChange={(e) => setOrcamento(e.target.value)}
        />

        {/* Upload da imagem */}
        <label className="flex items-center gap-2 cursor-pointer">
          <FaUpload />
          <span>Enviar imagem (JPG ou PNG)</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImagem(e.target.files[0])}
          />
        </label>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Publicar Anúncio
        </button>
      </form>
    </div>
  );
}
