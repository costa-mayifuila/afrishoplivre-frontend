// components/AvaliarProdutoModal.jsx
import React, { useState } from "react";
import api from "../api/api";
import { FaStar } from "react-icons/fa";

export default function AvaliarProdutoModal({ produtoId, onClose }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await api.post(
        "/reviews",
        { productId: produtoId, rating, comment },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Avaliação enviada com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      alert("Erro ao enviar avaliação");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Avaliar Produto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                className={`cursor-pointer ${
                  (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreva um comentário (opcional)"
            className="w-full border p-2 rounded"
            rows={4}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={enviando || rating === 0}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {enviando ? "Enviando..." : "Enviar Avaliação"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
