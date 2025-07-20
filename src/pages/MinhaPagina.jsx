// 📁 Imports de componentes principais
import PerfilUsuario from "../components/minha-conta/PerfilUsuario";
import MinhasCompras from "../components/minha-conta/MinhasCompras";
import PlaceholderSubpagina from "../components/minha-conta/PlaceholderSubpagina";
import SidebarMinhaConta from "../components/minha-conta/SidebarMinhaConta";

// 📁 Vendas
import Resumo from "../components/minha-conta/vendas/Resumo";
import Vendas from "../components/minha-conta/vendas/Vendas";
import Novidades from "../components/minha-conta/vendas/Novidades";
import PublicacaoDeProdutos from "../components/minha-conta/vendas/PublicacaoDeProdutos";
import Perguntas from "../components/minha-conta/vendas/Perguntas";
import AtendimentoPosVenda from "../components/minha-conta/vendas/AtendimentoPosVenda";
import Metricas from "../components/minha-conta/vendas/Metricas";
import Reputacao from "../components/minha-conta/vendas/Reputacao";
import PreferenciasDeEnvio from "../components/minha-conta/vendas/PreferenciasDeEnvio";
import CentralDeVendedores from "../components/minha-conta/vendas/CentralDeVendedores";

// 📁 Marketing
import CentralDeMarketing from "../components/minha-conta/marketing/CentralDeMarketing";
import Promocoes from "../components/minha-conta/marketing/Promocoes";
import Publicidade from "../components/minha-conta/marketing/Publicidade";
import MinhaPaginaMarketing from "../components/minha-conta/marketing/MinhaPagina";

// 📁 Configurações
import ContaEmpresarial from "../components/minha-conta/configuracoes/ContaEmpresarial";

// 📦 Bibliotecas
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MinhaPagina() {
  const [abaAtual, setAbaAtual] = useState("perfil");
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [mostrarSubVendas, setMostrarSubVendas] = useState(false);
  const [mostrarSubMarketing, setMostrarSubMarketing] = useState(false);
  const [mostrarSubConfig, setMostrarSubConfig] = useState(false);
  const [compras, setCompras] = useState([]);
  const [loadingCompras, setLoadingCompras] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const subVendas = [
    "Resumo",
    "Vendas",
    "Novidades",
    "Publicação de Produtos",
    "Perguntas",
    "Atendimento Pós-venda",
    "Métricas",
    "Reputação",
    "Preferências de envio",
    "Central de vendedores",
  ];

  const subMarketing = [
    "Central de marketing",
    "Promoções",
    "Publicidade",
    "Minha página",
  ];

  const subConfig = ["Conta empresarial"];

  const gerarSlug = (texto) =>
    texto
      .normalize("NFD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/me`, config);
        setUser(res.data);
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    const fetchCompras = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/orders/me`, config);
        setCompras(res.data);
      } catch (error) {
        console.error("Erro ao carregar compras:", error);
      } finally {
        setLoadingCompras(false);
      }
    };

    fetchProfile();
    fetchCompras();
  }, []); // ✅ sem dependências externas desnecessárias

  const renderConteudo = () => {
    if (abaAtual === "perfil") return <PerfilUsuario user={user} loading={loading} />;
    if (abaAtual === "compras") return <MinhasCompras compras={compras} loading={loadingCompras} />;

    if (abaAtual.startsWith("vendas/")) {
      const sub = abaAtual.split("/")[1];
      switch (sub) {
        case "resumo": return <Resumo />;
        case "vendas": return <Vendas />;
        case "novidades": return <Novidades />;
        case "publicacao-de-produtos": return <PublicacaoDeProdutos />;
        case "perguntas": return <Perguntas />;
        case "atendimento-pos-venda": return <AtendimentoPosVenda />;
        case "metricas": return <Metricas />;
        case "reputacao": return <Reputacao />;
        case "preferencias-de-envio": return <PreferenciasDeEnvio />;
        case "central-de-vendedores": return <CentralDeVendedores />;
        default: return <PlaceholderSubpagina titulo={`Subpágina: ${sub}`} />;
      }
    }

    if (abaAtual.startsWith("marketing/")) {
      const sub = abaAtual.split("/")[1];
      switch (sub) {
        case "central-de-marketing": return <CentralDeMarketing />;
        case "promocoes": return <Promocoes />;
        case "publicidade": return <Publicidade />;
        case "minha-pagina": return <MinhaPaginaMarketing />;
        default: return <PlaceholderSubpagina titulo={`Subpágina: ${sub}`} />;
      }
    }

    if (abaAtual.startsWith("config/")) {
      const sub = abaAtual.split("/")[1];
      switch (sub) {
        case "conta-empresarial": return <ContaEmpresarial />;
        default: return <PlaceholderSubpagina titulo={`Subpágina: ${sub}`} />;
      }
    }

    return <p className="text-gray-600">Selecione uma opção do menu para começar.</p>;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <SidebarMinhaConta
        abaAtual={abaAtual}
        setAbaAtual={setAbaAtual}
        gerarSlug={gerarSlug}
        mostrarSubVendas={mostrarSubVendas}
        setMostrarSubVendas={setMostrarSubVendas}
        mostrarSubMarketing={mostrarSubMarketing}
        setMostrarSubMarketing={setMostrarSubMarketing}
        mostrarSubConfig={mostrarSubConfig}
        setMostrarSubConfig={setMostrarSubConfig}
        subVendas={subVendas}
        subMarketing={subMarketing}
        subConfig={subConfig}
      />
      <main className="flex-grow p-8">{renderConteudo()}</main>
    </div>
  );
}
