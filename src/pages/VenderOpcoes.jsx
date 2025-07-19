import React from "react";
import { FaMobileAlt, FaCar, FaHome, FaLaptop } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function VenderOpcoes() {
  const navigate = useNavigate();

  const opcoes = [
    {
      label: "Produtos",
      icon: <FaMobileAlt className="text-4xl text-blue-600" />,
      path: "/vender/produtos",
    },
    {
      label: "Veículos",
      icon: <FaCar className="text-4xl text-green-600" />,
      path: "/vender/veiculos",
    },
    {
      label: "Imóveis",
      icon: <FaHome className="text-4xl text-orange-600" />,
      path: "/vender/imoveis",
    },
    {
      label: "Serviços",
      icon: <FaLaptop className="text-4xl text-purple-600" />,
      path: "/vender/servicos",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">
        👋 Olá! Antes de mais nada, o que você vai anunciar?
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {opcoes.map((opcao) => (
          <div
            key={opcao.label}
            onClick={() => navigate(opcao.path)}
            className="bg-white rounded-xl shadow hover:shadow-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition transform hover:scale-105"
            role="button"
            aria-label={`Anunciar ${opcao.label}`}
          >
            {opcao.icon}
            <span className="mt-3 text-sm font-semibold text-gray-700">{opcao.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
