import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaGlobe,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCamera,
  FaUpload,
  FaSearch,
} from "react-icons/fa";

export default function Header() {
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
    <header className="bg-black text-white w-full py-4 px-4 md:px-8 shadow-md">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center justify-between w-full">

        {/* 🔗 Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight hover:text-gray-300"
        >
          AfriShopLivre
        </Link>

        {/* 🔎 Barra de Pesquisa */}
        <div className="flex w-full max-w-full sm:max-w-md bg-white rounded-full shadow-md px-3 py-2 items-center">
          <input
            type="text"
            className="flex-grow px-2 py-1 text-black outline-none text-sm"
            placeholder="Pesquisar produtos..."
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

        {/* 📍 Endereço */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <FaMapMarkerAlt />
          <input
            type="text"
            className="bg-black text-white border-b border-white outline-none w-full sm:w-48 text-sm"
            placeholder="Endereço de entrega"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* 🌍 Idioma e Moeda */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <FaGlobe />
          <select
            className="bg-black text-white outline-none text-sm"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="pt">🇦🇴 Português</option>
            <option value="en">🇺🇸 English</option>
            <option value="fr">🇫🇷 Français</option>
          </select>
          <select
            className="bg-black text-white outline-none text-sm"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="AOA">AOA</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* 📩 Links de conta */}
        <div className="flex items-center gap-4 text-sm whitespace-nowrap">
          <Link to="/messages" className="flex items-center gap-1 hover:text-gray-400">
            <FaEnvelope />
            <span>Mensagens</span>
          </Link>
          <Link to="/minha-conta" className="hover:text-gray-400">
            Minha Conta
          </Link>
        </div>
      </div>
    </header>
  );
}

