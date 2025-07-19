import React from "react";
import { FaGlobe, FaEye, FaEdit, FaPalette } from "react-icons/fa";

export default function MinhaPagina() {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-4xl w-full">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">🌐 Minha Página Pública</h2>
      <p className="text-gray-700 mb-6">
        Personalize a vitrine da sua loja e defina como seus produtos serão apresentados aos visitantes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaEye className="text-blue-600" />
            <h3 className="text-lg font-semibold">Visualização Pública</h3>
          </div>
          <p className="text-sm text-gray-600">
            Veja como os visitantes enxergam sua página de vendedor com todos os seus produtos.
          </p>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaEdit className="text-green-600" />
            <h3 className="text-lg font-semibold">Editar Perfil Público</h3>
          </div>
          <p className="text-sm text-gray-600">
            Atualize nome da loja, imagem de capa, descrição e redes sociais.
          </p>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaPalette className="text-pink-500" />
            <h3 className="text-lg font-semibold">Tema e Estilo</h3>
          </div>
          <p className="text-sm text-gray-600">
            Escolha cores, banners e layout que combinem com sua identidade visual.
          </p>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaGlobe className="text-purple-600" />
            <h3 className="text-lg font-semibold">Link Personalizado</h3>
          </div>
          <p className="text-sm text-gray-600">
            Crie um link exclusivo para divulgar sua página como:{" "}
            <span className="text-blue-600 font-mono">/loja/meu-nome</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
