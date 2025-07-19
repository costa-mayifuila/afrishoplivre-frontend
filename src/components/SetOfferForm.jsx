import React, { useState } from "react";
import api from "../api/api";

export default function SetOfferForm({ productId }) {
  const [discount, setDiscount] = useState("");
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setErro("");
    setLoading(true);

    try {
      await api.put(`/products/oferta/${productId}`, {
        discountPercentage: parseInt(discount),
        durationInDays: parseInt(days),
      });
      setMensagem("✅ Oferta aplicada com sucesso!");
      setDiscount("");
      setDays("");
    } catch (error) {
      console.error(error);
      setErro("❌ Erro ao definir a oferta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md max-w-md w-full mx-auto"
    >
      <h2 className="text-xl font-bold mb-4 text-blue-700">💸 Definir Oferta</h2>

      {mensagem && <p className="text-green-600 mb-3">{mensagem}</p>}
      {erro && <p className="text-red-600 mb-3">{erro}</p>}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Porcentagem de Desconto (%)
        </label>
        <input
          type="number"
          className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          min="1"
          max="90"
          placeholder="Ex: 15"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Duração da Oferta (em dias)
        </label>
        <input
          type="number"
          className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          min="1"
          placeholder="Ex: 7"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ${
          loading && "opacity-60 cursor-not-allowed"
        }`}
      >
        {loading ? "Aplicando..." : "Aplicar Oferta"}
      </button>
    </form>
  );
}
