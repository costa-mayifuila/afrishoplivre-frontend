import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye, FaShoppingCart } from "react-icons/fa";

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        console.log("Produtos carregados:", res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-10 text-indigo-700 text-center">
          🛍️ Navegue por Nossos Produtos
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Carregando produtos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 relative group overflow-hidden"
                >
                  <img
                    src={
                      product.images?.length > 0
                        ? `http://localhost:5000/uploads/produtos/${product.images[0].filename}`
                        : "https://via.placeholder.com/400x300?text=Sem+Imagem"
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-xl transition group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h2>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                    <p className="text-xl font-bold text-green-600 mt-3">Kz {product.price}</p>

                    <div className="flex gap-2 mt-4">
                      <Link
                        to={`/product/${product._id}`}
                        className="flex-1 bg-gradient-to-r from-sky-600 to-sky-800 text-white text-sm px-4 py-2 rounded-md text-center hover:opacity-90 transition flex items-center justify-center gap-2"
                      >
                        <FaEye /> Ver Detalhes
                      </Link>
                      <Link
                        to={`/checkout/${product._id}`}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm px-4 py-2 rounded-md text-center hover:opacity-90 transition flex items-center justify-center gap-2"
                      >
                        <FaShoppingCart /> Comprar
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">Nenhum produto encontrado.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
