import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PromocoesPublicas() {
  const [promocoes, setPromocoes] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await axios.get("/api/promocoes/ativas");
        setPromocoes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao carregar promoções públicas:", err);
        setPromocoes([]);
      }
    };
    carregar();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-bold text-pink-700 mb-4 text-center">
        🔥 Ofertas em Promoção
      </h2>

      {promocoes.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">
          Nenhuma promoção disponível no momento.
        </p>
      ) : (
        <div className="flex overflow-x-auto gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 sm:overflow-visible">
          {promocoes.map((promo) => (
            <div
              key={promo._id}
              className="min-w-[240px] sm:min-w-0 border p-4 rounded-lg shadow hover:shadow-md transition flex-shrink-0"
            >
              <p className="text-lg font-semibold text-gray-800 line-clamp-1">
                {promo.produto}
              </p>
              <p className="text-red-600 font-bold mt-2">
                {promo.desconto}% de desconto
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Válido até{" "}
                <span className="font-semibold">
                  {new Date(promo.validade).toLocaleDateString()}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
