import React, { useState } from "react";
import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function MinhasCompras({ compras, loading }) {
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(5);
  const [enviando, setEnviando] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
      case "concluido":
        return "text-green-600 bg-green-100";
      case "pending":
      case "pendente":
        return "text-yellow-600 bg-yellow-100";
      case "cancelled":
      case "cancelado":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const gerarPDF = (pedido) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Recibo de Compra", 14, 20);
    doc.setFontSize(12);
    doc.text(`Pedido: #${pedido._id}`, 14, 30);
    doc.text(`Data: ${format(new Date(pedido.createdAt), "dd/MM/yyyy")}`, 14, 38);
    doc.text(`Total: ${pedido.totalAmount} AOA`, 14, 46);
    doc.text(`Status: ${pedido.status}`, 14, 54);

    const items = pedido.items.map((it) => [it.name, it.quantity]);
    doc.autoTable({ startY: 62, head: [["Produto", "Qtd"]], body: items });
    doc.save(`recibo_${pedido._id}.pdf`);
  };

  const enviarAvaliacao = async () => {
    if (comentario.trim().length < 10) {
      alert("⚠️ O comentário deve ter no mínimo 10 caracteres.");
      return;
    }

    try {
      setEnviando(true);
      await fetch(`${import.meta.env.VITE_API_URL}/avaliacoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productId: produtoSelecionado._id,
          rating: nota,
          comment: comentario,
        }),
      });
      alert("✅ Avaliação enviada com sucesso!");
      setProdutoSelecionado(null);
      setComentario("");
      setNota(5);
    } catch {
      alert("❌ Erro ao enviar avaliação.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">🛒 Minhas Compras</h1>

      {loading ? (
        <p className="text-gray-500">🔄 Carregando seus pedidos...</p>
      ) : compras.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold mb-2">Você ainda não realizou compras</h2>
          <p className="text-gray-600 mb-4">
            Aqui você poderá acompanhar todas as suas compras e entregas.
          </p>
          <a
            href="/products"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Ver ofertas do dia
          </a>
        </div>
      ) : (
        <div className="space-y-5">
          {compras.map((compra) => (
            <div
              key={compra._id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-gray-800">
                  Pedido <span className="text-blue-600">#{compra._id}</span>
                </h3>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-semibold ${getStatusColor(
                    compra.status
                  )}`}
                >
                  {compra.status}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                📆 {format(new Date(compra.createdAt), "dd/MM/yyyy HH:mm")}
              </p>

              <p className="text-gray-700 text-sm mb-2">
                Total: <strong>{compra.totalAmount} AOA</strong>
              </p>

              <ul className="pl-4 list-disc text-sm text-gray-600 mb-2">
                {compra.items.map((item, i) => (
                  <li key={i} className="flex justify-between items-center gap-4">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    {["approved", "concluido"].includes(compra.status) && (
                      <button
                        onClick={() => setProdutoSelecionado(item)}
                        className="text-blue-600 text-xs hover:underline"
                      >
                        💬 Avaliar
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 mt-3">
                <button
                  onClick={() => gerarPDF(compra)}
                  className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                >
                  📤 Baixar Recibo
                </button>

                <span className="text-sm text-green-700 font-medium">
                  📦 Rastreando: {compra.rastreamento || "Aguardando envio..."}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {produtoSelecionado && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              📝 Avaliar {produtoSelecionado.name}
            </h2>

            <label className="block mb-2 font-medium">Nota (1 a 5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={nota}
              onChange={(e) => setNota(Number(e.target.value))}
              className="border p-2 w-full rounded mb-4"
            />

            <label className="block mb-2 font-medium">Comentário:</label>
            <textarea
              rows={4}
              className="border p-2 w-full rounded mb-4"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setProdutoSelecionado(null)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={enviarAvaliacao}
                disabled={enviando}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {enviando ? "Enviando..." : "Enviar Avaliação"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
