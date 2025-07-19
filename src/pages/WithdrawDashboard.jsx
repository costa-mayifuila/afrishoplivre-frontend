import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function WithdrawDashboard() {
  const [withdraws, setWithdraws] = useState([]);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("banco");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWithdraws = async () => {
      try {
        const res = await api.get("/withdraws");
        setWithdraws(res.data);
      } catch (error) {
        console.error("Erro ao buscar saques:", error);
      }
    };

    fetchWithdraws();
  }, []);

  const handleWithdrawRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/withdraws", { amount, paymentMethod, details });
      alert("✅ Saque solicitado com sucesso!");
      setAmount("");
      setDetails("");
    } catch (error) {
      console.error(error);
      alert("❌ Erro ao solicitar saque.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "aprovado":
        return "text-green-600 font-semibold";
      case "rejeitado":
        return "text-red-600 font-semibold";
      default:
        return "text-yellow-600 font-semibold";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">💸 Solicitar Saque</h2>

      {/* Formulário de Saque */}
      <form
        onSubmit={handleWithdrawRequest}
        className="bg-gray-100 p-4 rounded-lg mb-8 space-y-4"
      >
        <input
          type="number"
          placeholder="Valor (AOA)"
          className="w-full p-3 border rounded-lg"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          className="w-full p-3 border rounded-lg"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="banco">🏦 Depósito Bancário</option>
          <option value="wallet">💳 Carteira Digital</option>
        </select>

        <input
          type="text"
          placeholder="IBAN ou Carteira Digital"
          className="w-full p-3 border rounded-lg"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition ${
            loading && "opacity-60 cursor-not-allowed"
          }`}
        >
          {loading ? "Enviando solicitação..." : "Solicitar Saque"}
        </button>
      </form>

      {/* Histórico de Saques */}
      <h3 className="text-xl font-bold mb-3 text-gray-800">📜 Histórico de Saques</h3>
      <ul className="space-y-3">
        {withdraws.map((withdraw) => (
          <li
            key={withdraw._id}
            className="border-b pb-2 text-sm flex justify-between items-center"
          >
            <span>
              💰 {withdraw.amount} AOA via {withdraw.paymentMethod === "banco" ? "Banco" : "Carteira"}
            </span>
            <span className={getStatusClass(withdraw.status)}>
              {withdraw.status.charAt(0).toUpperCase() + withdraw.status.slice(1)}
            </span>
          </li>
        ))}
        {withdraws.length === 0 && (
          <li className="text-gray-500 text-sm">Nenhum saque registrado ainda.</li>
        )}
      </ul>
    </div>
  );
}
