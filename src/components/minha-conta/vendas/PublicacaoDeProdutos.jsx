// src/components/PublicacaoDeProdutos.jsx
import React, { useState } from "react";
import { FaBoxOpen, FaCloudUploadAlt } from "react-icons/fa";
import api from "../api/api.jsx"; // axios configurado com baseURL e token

export default function PublicacaoDeProdutos() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [imagens, setImagens] = useState([]);
  const [preview, setPreview] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagens(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setErro("");

    if (formData.description.length < 150) {
      setErro("A descrição deve ter no mínimo 150 caracteres.");
      return;
    }

    try {
      // Prepara FormData
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        form.append(key, value)
      );
      imagens.forEach((img) => form.append("images", img));

      // Chama o endpoint correto: POST /api/products
      await api.post("/api/products", form);

      setMensagem("✅ Produto publicado com sucesso!");
      // Limpa formulário
      setFormData({ name: "", description: "", price: "", category: "" });
      setImagens([]);
      setPreview([]);
    } catch (err) {
      console.error("Erro ao publicar produto:", err);
      const msg =
        err.response?.data?.message || "❌ Erro ao publicar o produto.";
      setErro(msg);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 rounded-2xl shadow-xl max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-6">
        <FaBoxOpen className="text-indigo-700 text-2xl" />
        <h2 className="text-2xl font-bold text-indigo-800">📦 Publicar Produto</h2>
      </div>

      {mensagem && (
        <p className="bg-green-100 border border-green-400 text-green-700 p-3 rounded mb-4 text-sm">
          {mensagem}
        </p>
      )}
      {erro && (
        <p className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4 text-sm">
          {erro}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nome */}
        <div>
          <label className="text-sm text-gray-700 font-semibold block mb-1">
            Nome do Produto
          </label>
          <input
            type="text"
            name="name"
            placeholder="Ex: Telemóvel Samsung A23"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="text-sm text-gray-700 font-semibold block mb-1">
            Descrição
          </label>
          <textarea
            name="description"
            placeholder="Descreva o produto com no mínimo 150 caracteres"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
            rows={4}
            required
          />
        </div>

        {/* Preço e Categoria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700 font-semibold block mb-1">
              Preço (Kz)
            </label>
            <input
              type="number"
              name="price"
              placeholder="Ex: 12000"
              value={formData.price}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 font-semibold block mb-1">
              Categoria
            </label>
            <input
              type="text"
              name="category"
              placeholder="Ex: Eletrônicos"
              value={formData.category}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
        </div>

        {/* Upload de Imagens */}
        <div>
          <label className="text-sm text-gray-700 font-semibold block mb-1">
            Imagens do Produto
          </label>
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
            <FaCloudUploadAlt />
            <span>Selecionar Imagens</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              required
            />
          </label>
          <div className="flex flex-wrap gap-3 mt-3">
            {preview.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`imagem-preview-${i}`}
                className="w-16 h-16 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white px-6 py-3 font-semibold rounded-lg hover:opacity-90 transition shadow-md"
        >
          🚀 Publicar Produto Agora
        </button>
      </form>
    </div>
  );
}
