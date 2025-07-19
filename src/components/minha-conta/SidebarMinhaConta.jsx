import React from "react";
import {
  FaUser,
  FaShoppingBag,
  FaBullhorn,
  FaCog,
  FaChevronDown,
  FaChevronRight,
  FaStore,
} from "react-icons/fa";

export default function SidebarMinhaConta({
  abaAtual,
  setAbaAtual,
  gerarSlug,
  mostrarSubVendas,
  setMostrarSubVendas,
  mostrarSubMarketing,
  setMostrarSubMarketing,
  mostrarSubConfig,
  setMostrarSubConfig,
  subVendas,
  subMarketing,
  subConfig,
}) {
  const ItemBase = ({ icone, texto, ativo, onClick }) => (
    <li
      onClick={onClick}
      className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md transition hover:text-blue-600 ${
        ativo ? "text-blue-600 font-semibold bg-blue-50" : "text-gray-700"
      }`}
    >
      {icone} {texto}
    </li>
  );

  const SubmenuItem = ({ sub, tipo }) => {
    const slug = `${tipo}/${gerarSlug(sub)}`;
    const ativo = abaAtual === slug;
    return (
      <li
        key={sub}
        onClick={() => setAbaAtual(slug)}
        className={`cursor-pointer px-2 py-1 rounded-md text-sm transition hover:text-blue-600 ${
          ativo ? "text-blue-600 font-semibold bg-blue-50" : "text-gray-700"
        }`}
      >
        {sub}
      </li>
    );
  };

  return (
    <aside className="w-full md:w-64 bg-white p-6 shadow-md overflow-y-auto max-h-screen">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Minha Conta</h2>
      <ul className="space-y-4 text-sm">
        <ItemBase
          icone={<FaUser />}
          texto="Perfil"
          ativo={abaAtual === "perfil"}
          onClick={() => setAbaAtual("perfil")}
        />
        <ItemBase
          icone={<FaShoppingBag />}
          texto="Compras"
          ativo={abaAtual === "compras"}
          onClick={() => setAbaAtual("compras")}
        />

        {/* Vendas */}
        <li>
          <div
            className="flex items-center justify-between cursor-pointer hover:text-blue-600"
            onClick={() => setMostrarSubVendas(!mostrarSubVendas)}
          >
            <span className="flex items-center gap-2 text-gray-800">
              <FaStore /> Vendas
            </span>
            {mostrarSubVendas ? <FaChevronDown /> : <FaChevronRight />}
          </div>
          {mostrarSubVendas && (
            <ul className="ml-4 mt-2 space-y-1 border-l border-gray-200 pl-3">
              {subVendas.map((sub) => (
                <SubmenuItem key={sub} sub={sub} tipo="vendas" />
              ))}
            </ul>
          )}
        </li>

        {/* Marketing */}
        <li>
          <div
            className="flex items-center justify-between cursor-pointer hover:text-blue-600"
            onClick={() => setMostrarSubMarketing(!mostrarSubMarketing)}
          >
            <span className="flex items-center gap-2 text-gray-800">
              <FaBullhorn /> Marketing
            </span>
            {mostrarSubMarketing ? <FaChevronDown /> : <FaChevronRight />}
          </div>
          {mostrarSubMarketing && (
            <ul className="ml-4 mt-2 space-y-1 border-l border-gray-200 pl-3">
              {subMarketing.map((sub) => (
                <SubmenuItem key={sub} sub={sub} tipo="marketing" />
              ))}
            </ul>
          )}
        </li>

        {/* Configurações */}
        <li>
          <div
            className="flex items-center justify-between cursor-pointer hover:text-blue-600"
            onClick={() => setMostrarSubConfig(!mostrarSubConfig)}
          >
            <span className="flex items-center gap-2 text-gray-800">
              <FaCog /> Configurações
            </span>
            {mostrarSubConfig ? <FaChevronDown /> : <FaChevronRight />}
          </div>
          {mostrarSubConfig && (
            <ul className="ml-4 mt-2 space-y-1 border-l border-gray-200 pl-3">
              {subConfig.map((sub) => (
                <SubmenuItem key={sub} sub={sub} tipo="config" />
              ))}
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}
