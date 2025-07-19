import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTv,
  FaTshirt,
  FaCouch,
  FaFootballBall,
  FaSpa,
  FaBook,
} from 'react-icons/fa';

const categories = [
  { id: 1, name: 'Eletrônicos', slug: 'eletronicos', icon: <FaTv size={24} /> },
  { id: 2, name: 'Moda', slug: 'moda', icon: <FaTshirt size={24} /> },
  { id: 3, name: 'Casa e Decoração', slug: 'casa-decoracao', icon: <FaCouch size={24} /> },
  { id: 4, name: 'Esportes', slug: 'esportes', icon: <FaFootballBall size={24} /> },
  { id: 5, name: 'Beleza', slug: 'beleza', icon: <FaSpa size={24} /> },
  { id: 6, name: 'Livros', slug: 'livros', icon: <FaBook size={24} /> },
];

const CategoryList = () => {
  return (
    <div className="bg-gray-100 container mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
        🗂️ Categorias
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="bg-white p-4 rounded-xl shadow hover:shadow-xl text-center transition duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-2 text-blue-600">{category.icon}</div>
            <span className="text-sm md:text-base font-semibold text-gray-700">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
