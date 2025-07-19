import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Componentes
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

// Páginas
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SellerAccount from "./pages/SellerAccount";
import SellerLayout from "./layouts/SellerLayout";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import MyProducts from "./pages/MyProducts";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutFailure from "./pages/CheckoutFailure";
import CheckoutPending from "./pages/CheckoutPending";
import Payment from "./pages/Payment";
import Clips from "./pages/Clips";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CategoryPage from "./pages/CategoryPage";
import TesteConexao from "./pages/TesteConexao";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import WithdrawDashboard from "./pages/WithdrawDashboard";
import AdminWithdraws from "./pages/AdminWithdraws";
import MinhaPagina from "./pages/MinhaPagina";
import PerfilDetalhado from "./pages/PerfilDetalhado";
import ProMaxCheckout from "./pages/ProMaxCheckout";
import EnviarClip from "./pages/EnviarClip";
import MinhasPublicacoes from "./pages/MinhasPublicacoes";
import PainelClipes from "./pages/PainelClipes";
import EditarClip from "./pages/EditarClip";
import DashboardAdmin from "./pages/DashboardAdmin";

// ✅ Páginas de checkout personalizado
import EscolherPagamento from "./pages/EscolherPagamento";
import PagamentoTransferencia from "./pages/PagamentoTransferencia";
import PagamentoDeposito from "./pages/PagamentoDeposito";
import CheckoutMulticaixa from "./pages/CheckoutMulticaixa";
import CheckoutUnificado from "./pages/CheckoutUnificado";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <CartProvider>
      <Router>
        <Header />
        <Navbar onSearch={setSearchQuery} />
        <Routes>
          {/* ✅ Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList searchQuery={searchQuery} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/clips" element={<Clips />} />
          <Route path="/teste-conexao" element={<TesteConexao />} />
          <Route path="/checkout/promax" element={<ProMaxCheckout />} />
          <Route path="/minhas-publicacoes" element={<MinhasPublicacoes />} />
          <Route path="/painel-clipes" element={<PainelClipes />} />
          <Route path="/editar-clipe/:id" element={<EditarClip />} />
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />

          {/* ✅ Checkout por tipo de pagamento */}
          <Route path="/comprar/:id" element={<EscolherPagamento />} />
          <Route path="/checkout/multicaixa/:id" element={<CheckoutMulticaixa />} />
          <Route path="/checkout/transferencia/:id" element={<PagamentoTransferencia />} />
          <Route path="/checkout/deposito/:id" element={<PagamentoDeposito />} />
          <Route path="/checkout/unificado/:id" element={<CheckoutUnificado />} />

          {/* ✅ Rotas protegidas */}
          <Route path="/product/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
          <Route path="/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/my-products" element={<PrivateRoute><MyProducts /></PrivateRoute>} />

          {/* ✅ Checkout padrão e finalizações */}
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/checkout/:id" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/checkout/success" element={<PrivateRoute><CheckoutSuccess /></PrivateRoute>} />
          <Route path="/checkout/failure" element={<PrivateRoute><CheckoutFailure /></PrivateRoute>} />
          <Route path="/checkout/pending" element={<PrivateRoute><CheckoutPending /></PrivateRoute>} />

          <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path="/minha-conta/perfil" element={<PrivateRoute><PerfilDetalhado /></PrivateRoute>} />
          <Route path="/minha-conta" element={<PrivateRoute><MinhaPagina /></PrivateRoute>} />
          <Route path="/enviar-clipe" element={<PrivateRoute><EnviarClip /></PrivateRoute>} />

          {/* ✅ Área do Vendedor */}
          <Route path="/seller" element={<SellerLayout />}>
            <Route index element={<SellerAccount />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<h2>Meus Produtos</h2>} />
            <Route path="orders" element={<h2>Pedidos</h2>} />
            <Route path="earnings" element={<h2>Ganhos</h2>} />
          </Route>

          {/* ✅ Área do Afiliado */}
          <Route path="/afiliado" element={<PrivateRoute><AffiliateDashboard /></PrivateRoute>} />
          <Route path="/afiliado/saques" element={<PrivateRoute><WithdrawDashboard /></PrivateRoute>} />

          {/* ✅ Administração */}
          <Route path="/admin/saques" element={<PrivateRoute><AdminWithdraws /></PrivateRoute>} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
