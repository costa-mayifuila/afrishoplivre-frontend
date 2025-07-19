import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaBox,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

export default function SellerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);
  const [stats, setStats] = useState({
    totalVendas: 0,
    totalProdutos: 0,
    receita: 0,
  });
  const vendedor = { nome: "Vendedor Exemplo" }; // Substituir futuramente com dados reais

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/seller/overview", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setStats({
          totalProdutos: data.totalProdutos,
          totalVendas: data.totalVendas,
          receita: data.receita,
        });
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Menu Hamburguer para Mobile */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="text-white bg-gray-800 p-2 rounded-md"
        >
          {menuAberto ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Barra Lateral */}
      <aside
        className={`${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transform transition-transform duration-300 fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 z-40 flex flex-col gap-6`}
      >
        {/* Avatar e Nome */}
        <div className="flex flex-col items-center gap-2">
          <FaUserCircle className="text-5xl text-gray-400" />
          <span className="font-semibold text-lg">{vendedor.nome}</span>
        </div>

        <h2 className="text-xl font-bold text-center mt-4">Painel do Vendedor</h2>

        <nav className="flex flex-col gap-4 mt-4">
          <Link
            to="/seller/dashboard"
            className={`flex items-center gap-2 px-2 py-1 rounded ${
              isActive("/seller/dashboard") ? "bg-gray-700" : "hover:text-gray-300"
            }`}
            onClick={() => setMenuAberto(false)}
          >
            <FaChartPie /> <span>Dashboard</span>
          </Link>

          <Link
            to="/seller/products"
            className={`flex items-center gap-2 px-2 py-1 rounded ${
              isActive("/seller/products") ? "bg-gray-700" : "hover:text-gray-300"
            }`}
            onClick={() => setMenuAberto(false)}
          >
            <FaBox /> <span>Meus Produtos</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-600 mt-6"
          >
            <FaSignOutAlt /> <span>Sair</span>
          </button>
        </nav>

        {/* Estatísticas Rápidas */}
        <div className="mt-6 bg-gray-800 p-4 rounded-lg text-sm space-y-3">
          <div className="flex items-center justify-between">
            <span>Total de Vendas:</span>
            <span className="font-bold">{stats.totalVendas}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Produtos:</span>
            <span className="font-bold">{stats.totalProdutos}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Receita (Kz):</span>
            <span className="font-bold text-green-400">
              {stats.receita.toLocaleString()}
            </span>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
