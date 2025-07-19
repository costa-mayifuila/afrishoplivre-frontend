import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function TodayOffers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await api.get("/products/ofertas");
        setOffers(res.data);
      } catch (error) {
        console.error("Erro ao buscar ofertas:", error);
      }
    };
    fetchOffers();

    const interval = setInterval(() => {
      setOffers((prev) => [...prev]); // Força re-render a cada segundo
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateTimeLeft = (offerExpiresAt) => {
    const now = new Date();
    const expiration = new Date(offerExpiresAt);
    const difference = expiration - now;

    if (difference <= 0) return "Expirado";

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const calcularPrecoComDesconto = (preco, desconto) => {
    const descontoTotal = preco * (desconto / 100);
    return (preco - descontoTotal).toFixed(2);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
        🔥 Ofertas Relâmpago de Hoje
      </h2>

      {offers.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhuma oferta disponível no momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {offers.map((product) => {
            const precoFinal = calcularPrecoComDesconto(
              product.price,
              product.discountPercentage
            );

            return (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>

                <div className="mt-3">
                  <span className="text-red-600 font-bold text-lg">
                    -{product.discountPercentage}% OFF
                  </span>
                  <p className="text-green-700 font-bold text-xl mt-1">
                    AOA {precoFinal}
                  </p>
                  <p className="text-sm line-through text-gray-400">
                    AOA {product.price}
                  </p>
                </div>

                <p className="text-sm mt-2 text-gray-600">
                  ⏳ Expira em:{" "}
                  <span className="font-semibold">
                    {calculateTimeLeft(product.offerExpiresAt)}
                  </span>
                </p>

                <Link
                  to={`/checkout/${product._id}`}
                  className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Comprar Agora
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
