import React, { useState } from "react";
import axios from "axios";

export default function ContaEmpresarial() {
  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    nif: "",
    alvara: "",
    documentos: null,
  });
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documentos: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setErro("");

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const form = new FormData();
      form.append("nomeEmpresa", formData.nomeEmpresa);
      form.append("nif", formData.nif);
      form.append("alvara", formData.alvara);
      if (formData.documentos) form.append("documentos", formData.documentos);

      await axios.post(`${import.meta.env.VITE_API_URL}/empresa`, form, config);

      setMensagem("✅ Dados empresariais enviados com sucesso!");
      setFormData({ nomeEmpresa: "", nif: "", alvara: "", documentos: null });
    } catch (err) {
      console.error(err);
      setErro("❌ Erro ao enviar os dados. Tente novamente.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl w-full">
      <h2 className="text-2xl font-bold mb-4">🏢 Conta Empresarial</h2>
      <p className="mb-6">
        Cadastre as informações da sua empresa para se tornar um vendedor verificado.
      </p>

      {mensagem && <p className="text-green-600 mb-4">{mensagem}</p>}
      {erro && <p className="text-red-600 mb-4">{erro}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome da Empresa</label>
          <input
            type="text"
            name="nomeEmpresa"
            value={formData.nomeEmpresa}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">NIF</label>
          <input
            type="text"
            name="nif"
            value={formData.nif}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Alvará Comercial</label>
          <input
            type="text"
            name="alvara"
            value={formData.alvara}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Enviar Documentos</label>
          <input
            type="file"
            name="documentos"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
