import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from 'react-icons/fa';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const token = localStorage.getItem('token');
      const formDataEnviar = new FormData();
      formDataEnviar.append('name', formData.name);
      formDataEnviar.append('description', formData.description);
      formDataEnviar.append('price', formData.price);
      if (imagem) formDataEnviar.append('image', imagem);

      const res = await axios.post('/api/products', formDataEnviar, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/products');
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
      setMensagem("Erro ao adicionar produto.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700">
          📦 Adicionar Produto
        </h1>

        {mensagem && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center text-sm">
            {mensagem}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Nome do Produto"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            placeholder="Descrição do Produto"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border rounded px-4 py-2 resize-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="price"
            placeholder="Preço"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <div>
            <label className="block text-sm font-medium mb-1">Imagem do Produto:</label>
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer flex items-center gap-2 text-blue-600 hover:underline">
                <FaCloudUploadAlt className="text-xl" />
                <span>Selecionar Imagem</span>
                <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
              </label>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-16 w-16 object-cover rounded border"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Adicionar Produto
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
