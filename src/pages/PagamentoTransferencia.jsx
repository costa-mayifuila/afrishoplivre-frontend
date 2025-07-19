import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PagamentoTransferencia = () => {
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [comprovativo, setComprovativo] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    if (!nome || !valor || !comprovativo) {
      setMensagem('⚠️ Preencha todos os campos e envie o comprovativo.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('valor', valor);
    formData.append('produtoId', id);
    formData.append('comprovativo', comprovativo);

    try {
      // Enviar para o backend
      await fetch('/api/pagamentos/transferencia', {
        method: 'POST',
        body: formData,
      });

      setMensagem('✅ Comprovativo enviado com sucesso!');
      setNome('');
      setValor('');
      setComprovativo(null);
    } catch (err) {
      console.error(err);
      setMensagem('❌ Erro ao enviar comprovativo.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-yellow-600">🏦 Transferência Bancária</h2>

        <p className="text-sm mb-4 text-gray-700">
          Transfira o valor para a conta abaixo e envie o comprovativo:
        </p>

        <div className="bg-yellow-100 p-4 rounded text-sm mb-6">
          <p><strong>Banco:</strong> BAI</p>
          <p><strong>Conta:</strong> 000000000001</p>
          <p><strong>Titular:</strong> AfriShopLivre LDA</p>
        </div>

        {mensagem && <p className="text-sm mb-4 text-center text-red-600">{mensagem}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Seu nome"
            className="w-full border p-2 rounded"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor transferido (Kz)"
            className="w-full border p-2 rounded"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setComprovativo(e.target.files[0])}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
          >
            📤 Enviar Comprovativo
          </button>
        </form>
      </div>
    </div>
  );
};

export default PagamentoTransferencia;
