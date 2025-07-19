import React, { useState } from "react";
import {
  FaChartPie,
  FaShoppingCart,
  FaBell,
  FaBoxOpen,
  FaQuestion,
  FaHeadset,
  FaChartLine,
  FaStar,
  FaTruck,
  FaStore
} from "react-icons/fa";

const abas = [
  { nome: "Resumo", icon: <FaChartPie /> },
  { nome: "Vendas", icon: <FaShoppingCart /> },
  { nome: "Novidades", icon: <FaBell /> },
  { nome: "Publicação de Produtos", icon: <FaBoxOpen /> },
  { nome: "Perguntas", icon: <FaQuestion /> },
  { nome: "Atendimento Pós-venda", icon: <FaHeadset /> },
  { nome: "Métricas", icon: <FaChartLine /> },
  { nome: "Reputação", icon: <FaStar /> },
  { nome: "Preferências de envio", icon: <FaTruck /> },
  { nome: "Central de vendedores", icon: <FaStore /> },
];

export default function VendasPainel() {
  const [abaAtual, setAbaAtual] = useState("Resumo");

  const renderConteudo = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-3">{abaAtual}</h2>
        <p className="text-gray-600">
          Conteúdo da aba <strong>{abaAtual}</strong> será exibido aqui em breve.
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Menu lateral interno */}
      <aside className="w-full md:w-64 bg-white rounded-lg shadow p-4">
        <h3 className="text-base font-bold mb-4 text-gray-700">Menu de Vendas</h3>
        <ul className="space-y-3 text-sm">
          {abas.map((aba) => (
            <li
              key={aba.nome}
              onClick={() => setAbaAtual(aba.nome)}
              className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition duration-200 ${
                abaAtual === aba.nome
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {aba.icon} {aba.nome}
            </li>
          ))}
        </ul>
      </aside>

      {/* Conteúdo dinâmico */}
      <main className="flex-grow">{renderConteudo()}</main>
    </div>
  );
}
