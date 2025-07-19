import React, { useState } from "react";
import { FaCreditCard, FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cartao");

  const cartItems = [
    { id: 1, name: "Produto 1", price: 5000, image: "https://via.placeholder.com/100" },
    { id: 2, name: "Produto 2", price: 7000, image: "https://via.placeholder.com/100" }
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    alert("Compra finalizada!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-800 text-center">
          🛒 Checkout
        </h2>

        {/* 📦 Resumo do Pedido */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-lg mb-3">Resumo do Pedido</h3>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 border-b pb-2">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <p className="flex-1">{item.name}</p>
                <p className="font-semibold">{item.price} AOA</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 font-bold text-lg">
            <span>Total:</span>
            <span>{total} AOA</span>
          </div>
        </div>

        {/* 🏠 Endereço */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
            <FaMapMarkerAlt /> Endereço de Entrega
          </h3>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* 💳 Pagamento */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-lg mb-2">💳 Método de Pagamento</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="cartao"
                checked={paymentMethod === "cartao"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FaCreditCard /> Cartão de Crédito
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="multicaixa"
                checked={paymentMethod === "multicaixa"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              💰 Multicaixa Express
            </label>
          </div>
        </div>

        {/* 🔘 Botão Finalizar */}
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
