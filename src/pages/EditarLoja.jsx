import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditarLoja() {
  const [form, setForm] = useState({
    nomeLoja: "",
    descricao: "",
    slug: "",
    instagram: "",
    facebook: "",
    whatsapp: "",
  });
  const [capa, setCapa] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await axios.get("/api/users/me");
        setForm({
          nomeLoja: data.nomeLoja || "",
          descricao: data.descricao || "",
          slug: data.slug || "",
          instagram: data.instagram || "",
          facebook: data.facebook || "",
          whatsapp: data.whatsapp || "",
        });
      } catch {
        setMensagem("Erro ao carregar dados.");
      }
    };
    carregar();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = new FormData();
    Object.keys(form).forEach((key) => dados.append(key, form[key]));
    if (capa) dados.append("capa", capa);

    try {
      await axios.put("/api/users/perfil-loja", dados);
      setMensagem("✅ Informações da loja atualizadas!");
    } catch (err) {
      setMensagem("❌ Erro ao salvar.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold text-purple-700 mb-4">🖋️ Editar Loja Pública</h2>
      {mensagem && <p className="mb-4 text-center">{mensagem}</p>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="nomeLoja"
          placeholder="Nome da loja"
          value={form.nomeLoja}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="slug"
          placeholder="Link personalizado (ex: sua-loja)"
          value={form.slug}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram (apenas usuário)"
          value={form.instagram}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="facebook"
          placeholder="Facebook (apenas usuário)"
          value={form.facebook}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp com DDI (ex: 244923000000)"
          value={form.whatsapp}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCapa(e.target.files[0])}
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Salvar alterações
        </button>
      </form>
    </div>
  );
}
