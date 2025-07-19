import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaChartPie,
  FaBox,
  FaShoppingBag,
  FaDollarSign,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function SellerAccount() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => setMenuAberto(!menuAberto);

  return (
    <div className="flex h-screen">
      {/* Menu Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleMenu} className="text-white bg-black p-2 rounded-md shadow-md">
          {menuAberto ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Barra Lateral */}
      <aside
        className={`${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transform md:static fixed top-0 left-0 h-full w-64 bg-black text-white p-6 z-40 transition-transform duration-300`}
      >
        <h2 className="text-2xl font-bold mb-6">Área do Vendedor</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/seller/dashboard"
              className="flex items-center gap-2 hover:text-gray-300"
              onClick={() => setMenuAberto(false)}
            >
              <FaChartPie />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/seller/products"
              className="flex items-center gap-2 hover:text-gray-300"
              onClick={() => setMenuAberto(false)}
            >
              <FaBox />
              Meus Produtos
            </Link>
          </li>
          <li>
            <Link
              to="/seller/orders"
              className="flex items-center gap-2 hover:text-gray-300"
              onClick={() => setMenuAberto(false)}
            >
              <FaShoppingBag />
              Pedidos
            </Link>
          </li>
          <li>
            <Link
              to="/seller/earnings"
              className="flex items-center gap-2 hover:text-gray-300"
              onClick={() => setMenuAberto(false)}
            >
              <FaDollarSign />
              Ganhos
            </Link>
          </li>
        </ul>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
