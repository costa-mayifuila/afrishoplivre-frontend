import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaGlobe,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCamera,
  FaUpload,
  FaSearch,
} from "react-icons/fa";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [language, setLanguage] = useState("pt");
  const [currency, setCurrency] = useState("AOA");
  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`📸 Imagem selecionada: ${file.name}`);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  return (
    <header className="bg-black text-white w-full py-4 px-4 md:px-8 relative shadow">
      {/* 🔝 Topo principal */}
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300">
          AfriShopLivre
        </Link>

        {/* 🔍 Pesquisa (visível apenas no desktop) */}
        <div className="hidden md:flex flex-grow max-w-lg items-center bg-white rounded-full shadow px-3 py-2 ml-auto">
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            className="flex-grow px-2 text-sm text-black outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="text-black px-2 hover:text-gray-600">
            <FaSearch />
          </button>
          <button onClick={handleCameraClick} className="text-black px-2 hover:text-gray-600">
            <FaCamera />
          </button>
          <button onClick={() => fileInputRef.current.click()} className="text-black px-2 hover:text-gray-600">
            <FaUpload />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        {/* ☰ Botão hambúrguer no mobile */}
        <button
          onClick={() => setMenuAberto(true)}
          className="lg:hidden text-xl hover:text-gray-300"
          aria-label="Abrir menu"
        >
          <FaBars />
        </button>
      </div>

      {/* 📱 Drawer lateral mobile */}
      {menuAberto && (
        <div className="fixed inset-0 z-50 flex">
          {/* 🟫 Fundo escuro para clique fora do drawer */}
          <div
            className="w-full h-full bg-black opacity-30"
            onClick={() => setMenuAberto(false)}
          />

          {/* 🧾 Conteúdo do menu */}
          <div className="w-72 bg-white text-black h-full p-6 shadow-lg animate-slideIn relative">
            <button
              onClick={() => setMenuAberto(false)}
              className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-red-600"
              aria-label="Fechar menu"
            >
              <FaTimes />
            </button>

            <nav className="flex flex-col gap-6 mt-10 text-sm">
              <Link
                to="/messages"
                onClick={() => setMenuAberto(false)}
                className="hover:text-blue-500"
              >
                📩 Mensagens
              </Link>
              <Link
                to="/minha-conta"
                onClick={() => setMenuAberto(false)}
                className="hover:text-blue-500"
              >
                👤 Minha Conta
              </Link>

              <div className="flex items-center gap-2">
                <FaGlobe />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                >
                  <option value="pt">Português</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="AOA">AOA</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <input
                  type="text"
                  placeholder="Endereço de entrega"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

