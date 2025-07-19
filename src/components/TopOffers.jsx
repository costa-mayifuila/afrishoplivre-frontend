import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function TopOffers() {
  const [topOffers, setTopOffers] = useState([]);

  useEffect(() => {
    const fetchTopOffers = async () => {
      try {
        const res = await api.get("/products/melhores-ofertas");
        setTopOffers(res.data);
      } catch (error) {
        console.error("Erro ao buscar melhores ofertas:", error);
      }
    };

    fetchTopOffers();
  }, []);

  const calcularPrecoComDesconto = (preco, desconto) => {
    const descontoTotal = preco * (desconto / 100);
    return (preco - descontoTotal).toFixed(2);
  };

  return (
    <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-yellow-800">
        🏆 Melhores Ofertas do Dia
      </h2>

      {topOffers.length === 0 ? (
        <p className="text-center text-gray-600">
          Nenhuma oferta em destaque no momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topOffers.map((product) => {
            const precoFinal = calcularPrecoComDesconto(
              product.price,
              product.discountPercentage
            );

            return (
              <div
                key={product._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
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
