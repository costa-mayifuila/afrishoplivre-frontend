import React, { useRef, useState } from "react";
import api from "../api/api";
import { FaSearch, FaCamera, FaUpload } from "react-icons/fa";

export default function SearchBar({ onResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef(null);

  const handleTextSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await api.get(`/search/text?query=${searchQuery}`);
      onResults(res.data.products);
    } catch (error) {
      console.error("Erro na busca textual:", error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await api.post("/search/image-search", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        onResults(res.data.products);
      } catch (error) {
        console.error("Erro ao pesquisar por imagem:", error);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex items-center gap-2 bg-white rounded-full shadow px-4 py-2">
      <input
        type="text"
        placeholder="Pesquisar produtos..."
        className="flex-grow text-sm px-2 py-1 text-black outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleTextSearch()}
      />
      <button
        onClick={handleTextSearch}
        className="text-black hover:text-blue-600 transition"
        title="Pesquisar"
      >
        <FaSearch />
      </button>
      <button
        onClick={() => fileInputRef.current.click()}
        className="text-black hover:text-blue-600 transition"
        title="Pesquisar por imagem"
      >
        <FaCamera />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  );
}
