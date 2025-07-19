import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminWithdraws() {
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    const fetchWithdraws = async () => {
      try {
        const res = await api.get("/admin/withdraws");
        setWithdraws(res.data);
      } catch (error) {
        console.error("Erro ao buscar saques pendentes:", error);
      }
    };

    fetchWithdraws();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/admin/withdraws/${id}`, { status });
      alert(`Saque ${status} com sucesso!`);
      setWithdraws(withdraws.filter((w) => w._id !== id));
    } catch (error) {
      alert("Erro ao atualizar status do saque.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700 text-center">
          📋 Aprovação de Saques
        </h2>

        {withdraws.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left text-sm sm:text-base">Usuário</th>
                  <th className="p-3 text-left text-sm sm:text-base">Valor</th>
                  <th className="p-3 text-left text-sm sm:text-base">Método</th>
                  <th className="p-3 text-left text-sm sm:text-base">Ação</th>
                </tr>
              </thead>
              <tbody>
                {withdraws.map((withdraw) => (
                  <tr key={withdraw._id} className="border-t">
                    <td className="p-3 text-sm sm:text-base">
                      {withdraw.user.name} <br className="block sm:hidden" />
                      <span className="text-gray-500 text-xs sm:text-sm">
                        ({withdraw.user.email})
                      </span>
                    </td>
                    <td className="p-3 text-sm sm:text-base">
                      {withdraw.amount} AOA
                    </td>
                    <td className="p-3 text-sm sm:text-base">
                      {withdraw.paymentMethod}
                    </td>
                    <td className="p-3 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleUpdateStatus(withdraw._id, "aprovado")}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(withdraw._id, "rejeitado")}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Rejeitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">Nenhum saque pendente no momento.</p>
        )}
      </div>
    </div>
  );
}
