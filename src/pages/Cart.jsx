import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart, subtotal } = useCart();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA'
    }).format(value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Seu Carrinho</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
          <Link to="/" className="btn btn-primary">
            Continuar Comprando
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <img 
                    src={item.image || '/placeholder-product.jpg'} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p>{formatCurrency(item.price)} × {item.qty}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button 
              onClick={clearCart}
              className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
            >
              Limpar Carrinho
            </button>
            <Link 
              to="/checkout" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Finalizar Compra
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;