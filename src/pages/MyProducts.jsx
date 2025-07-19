// src/pages/MyProducts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      const res = await axios.get('http://localhost:5000/api/products/my-products', config);
      setProducts(res.data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err.response?.data?.msg || err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Tem certeza que deseja excluir este produto?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      await axios.delete(`http://localhost:5000/api/products/${id}`, config);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      alert("Erro ao excluir o produto.");
    }
  };

  const formatarAOA = (valor) =>
    Number(valor).toLocaleString("pt-AO", {
      style: "currency",
      currency: "AOA",
    });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-800">📦 Meus Produtos</h1>
          <Link
            to="/minha-conta?vendas/publicacao-de-produtos"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Adicionar Produto
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum produto encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={
                    product.images?.[0]?.url ||
                    product.image ||
                    'https://via.placeholder.com/300x200?text=Produto'
                  }
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-blue-700 font-bold mt-2">
                  {product.price
                    ? formatarAOA(product.price)
                    : "Kz 0,00"}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to={`/product/${product._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Ver
                  </Link>
                  <button
                    onClick={() => navigate(`/editar-produto/${product._id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
