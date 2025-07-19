import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SearchResults = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500 text-lg">
        Nenhum produto encontrado.
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {results.map((product) => (
        <div
          key={product._id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300"
        >
          <Link to={`/product/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{product.description}</p>
            <p className="text-blue-700 text-lg font-bold mt-2">
              AOA {product.price}
            </p>
          </Link>
        </div>
      ))}
    </motion.div>
  );
};

export default SearchResults;


