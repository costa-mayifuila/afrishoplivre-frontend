import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
  const { slug } = useParams(); // Obtém o slug da categoria da URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products/category/${slug}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <span className="text-blue-600 text-xl font-semibold">🔄 Carregando produtos...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-blue-800">
          🗂️ Categoria: <span className="capitalize">{slug}</span>
        </h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-1 truncate">{product.name}</h2>
                  <p className="text-gray-600 font-medium">AOA {product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">Nenhum produto encontrado nesta categoria.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
