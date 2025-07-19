import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ListarPromocoes() {
  const [promocoes, setPromocoes] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await axios.get("/api/promocoes/minhas");
        setPromocoes(data);
      } catch {
        setErro("Erro ao carregar promoções.");
      }
    };
    carregar();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const novoStatus = currentStatus === "ativo" ? "inativo" : "ativo";
    try {
      const { data } = await axios.patch(`/api/promocoes/${id}`, { status: novoStatus });
      setPromocoes((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: data.status } : p))
      );
    } catch (err) {
      setErro("Erro ao alterar status.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-4xl w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-pink-700">📊 Minhas Promoções</h2>
      {erro && <p className="text-red-600 mb-4">{erro}</p>}

      {promocoes.length === 0 ? (
        <p className="text-gray-700">Nenhuma promoção encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {promocoes.map((promo) => (
            <div
              key={promo._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{promo.produto}</p>
                <p className="text-sm text-gray-500">
                  {promo.desconto}% até {new Date(promo.validade).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-600">Status: {promo.status}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/editar-promocao/${promo._id}`)}
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => toggleStatus(promo._id, promo.status)}
                  className={`text-sm text-white px-3 py-1 rounded ${
                    promo.status === "ativo"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {promo.status === "ativo" ? "Desativar" : "Ativar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
