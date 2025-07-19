import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Componentes reutilizáveis
import CategoryList from "../components/CategoryList";
import TodayOffers from "../components/TodayOffers";
import ExpiringOffersNotification from "../components/ExpiringOffersNotification";
import TopOffers from "../components/TopOffers";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/top-sales");
        setTopProducts(res.data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* 🔔 Notificação de Ofertas Expirando */}
        <ExpiringOffersNotification />

        {/* 🔍 Barra de Pesquisa */}
        <div className="mb-6">
          <SearchBar onResults={setSearchResults} />
        </div>

        {/* 🔎 Resultados da pesquisa */}
        {searchResults.length > 0 ? (
          <SearchResults results={searchResults} />
        ) : (
          <>
            {/* 🎞️ Carrossel */}
            <div className="mb-10">
              <Slider {...sliderSettings}>
                <div>
                  <img
                    src="https://i.im.ge/2025/03/16/p72oIc.Design-sem-nome-3.png"
                    alt="Banner 1"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div>
                  <img
                    src="https://i.im.ge/2025/03/16/p71Gur.esta-semana.png"
                    alt="Banner 2"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div>
                  <img
                    src="https://i.im.ge/2025/03/16/p72oIc.Design-sem-nome-3.png"
                    alt="Banner 3"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              </Slider>
            </div>

            {/* 🎉 Título e descrição */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
              Bem-vindo ao AfriShopLivre!
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center mb-10">
              Explore nossa incrível seleção de produtos.
            </p>

            {/* 🧭 Lista de Categorias */}
            <CategoryList />

            {/* 🔥 Ofertas do Dia */}
            <div className="mt-10">
              <TodayOffers />
            </div>

            {/* ⭐ Ofertas em Destaque */}
            <div className="mt-10">
              <TopOffers />
            </div>

            {/* 📈 Produtos Mais Vendidos */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-blue-800">
                Produtos Mais Vendidos da Semana
              </h2>

              {loading ? (
                <div className="text-center text-gray-600">Carregando...</div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {topProducts.map((product) => (
                    <div key={product._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                          Mais Vendido
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                      <p className="text-lg font-bold mt-2 text-blue-700">AOA {product.price}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              <div className="mt-8 text-center">
                <Link
                  to="/products"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition text-base sm:text-lg font-medium"
                >
                  Ver Todos os Produtos
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
