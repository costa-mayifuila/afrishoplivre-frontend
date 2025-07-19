import React from "react";

export default function PerfilUsuario({ user, loading }) {
  if (loading || !user) {
    return (
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">👤 Seu Perfil</h1>
        <p className="text-gray-500">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">👤 Seu Perfil</h1>

      <form className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            value={user.name}
            readOnly
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
          />
        </div>
      </form>
    </div>
  );
}
