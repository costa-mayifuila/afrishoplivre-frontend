import React from "react";
import { FaTools } from "react-icons/fa";

export default function PlaceholderSubpagina({ titulo }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-2xl mx-auto text-center">
      <div className="flex flex-col items-center justify-center text-gray-500">
        <FaTools className="text-5xl mb-4 text-blue-500" />
        <h2 className="text-xl font-bold capitalize mb-2 text-gray-800">
          {titulo}
        </h2>
        <p className="text-gray-600">O conteúdo de <strong>"{titulo}"</strong> estará disponível em breve. 🚧</p>
      </div>
    </div>
  );
}
