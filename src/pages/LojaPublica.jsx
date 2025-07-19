import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LojaPublica() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [vendedor, setVendedor] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [promocoes, setPromocoes] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await axios.get(`/api/publico/loja/${slug}`);
        setVendedor(data.vendedor);
        setProdutos(data.produtos);
        setPromocoes(data.promocoes);
      } catch (err) {
        console.error("Erro ao carregar loja:", err);
      }
    };
    carregar();
  }, [slug]);

  if (!vendedor) return <p className="p-6 text-center">Carregando loja...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* 📸 Capa da loja */}
      <div className="mb-6">
        {vendedor.capaUrl ? (
          <img
            src={vendedor.capaUrl}
            alt="Capa da loja"
            className="w-full h-48 object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-48 bg-purple-100 flex items-center justify-center rounded-md text-purple-600 font-bold">
            Sem capa personalizada
          </div>
        )}
      </div>

      {/* 🧑‍💼 Nome, descrição e redes */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">{vendedor.nomeLoja || vendedor.name}</h1>
        <p className="text-sm text-gray-600">{vendedor.descricao || "Sem descrição"}</p>

        {/* 🌐 Redes sociais */}
        <div className="mt-2 flex justify-center gap-4 text-blue-600">
          {vendedor.instagram && (
            <a
              href={`https://instagram.com/${vendedor.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Instagram
            </a>
          )}
          {vendedor.facebook && (
            <a
              href={`https://facebook.com/${vendedor.facebook}`}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Facebook
            </a>
          )}
          {vendedor.whatsapp && (
            <a
              href={`https://wa.me/${vendedor.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="hover:underline text-green-600"
            >
              WhatsApp
            </a>
          )}
        </div>

        {/* ☎️ Botão de contato */}
        {vendedor.whatsapp && (
          <a
            href={`https://wa.me/${vendedor.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
          >
            Fale com o vendedor
          </a>
        )}
      </div>

      {/* 🎯 Promoções ativas */}
      {promocoes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-pink-600 mb-2">🔥 Promoções Ativas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {promocoes.map((promo) => (
              <div key={promo._id} className="border p-3 rounded">
                <p className="font-semibold">{promo.produto}</p>
                <p className="text-sm text-gray-500">{promo.desconto}% de desconto</p>
                <p className="text-xs text-gray-400">
                  Até {new Date(promo.validade).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🛒 Produtos à venda */}
      <div>
        <h2 className="text-xl font-semibold text-blue-600 mb-2">🛒 Produtos à venda</h2>
        {produtos.length === 0 ? (
          <p className="text-gray-500">Este vendedor ainda não publicou produtos.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {produtos.map((produto) => (
              <div
                key={produto._id}
                className="border p-3 rounded hover:shadow cursor-pointer"
                onClick={() => navigate(`/produto/${produto._id}`)}
              >
                <img
                  src={produto.imagens?.[0]}
                  alt={produto.nome}
                  className="h-40 w-full object-cover rounded mb-2"
                />
                <p className="font-semibold">{produto.nome}</p>
                <p className="text-sm text-gray-700">Kz {produto.preco}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
