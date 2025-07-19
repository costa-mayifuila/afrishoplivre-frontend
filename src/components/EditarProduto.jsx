import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [imagem, setImagem] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`http://localhost:5000/api/products/${id}`, config);
        setFormData({
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          category: res.data.category,
        });
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setErro("");

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("category", formData.category);
      if (imagem) form.append("image", imagem);

      await axios.put(`http://localhost:5000/api/products/${id}`, form, config);

      setMensagem("✅ Produto atualizado com sucesso!");
      setTimeout(() => navigate("/seller/products"), 2000);
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      setErro("❌ Erro ao atualizar o produto.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">✏️ Editar Produto</h2>

        {mensagem && <p className="text-green-600 mb-4">{mensagem}</p>}
        {erro && <p className="text-red-600 mb-4">{erro}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nome do Produto"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            rows={4}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Preço (Kz)"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Categoria"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-4 py-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
