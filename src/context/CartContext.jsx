import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Erro ao ler carrinho do localStorage:", error);
      return [];
    }
  });

  // Persistência no localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Função para remover item do carrinho
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find(item => item._id === productId);
      if (itemToRemove) {
        toast.warning(`🗑️ ${itemToRemove.name || 'Item'} removido do carrinho`);
      }
      return prevCart.filter(item => item._id !== productId);
    });
  }, []);

  // Função para adicionar ao carrinho
  const addToCart = useCallback((product) => {
    if (!product?._id || typeof product?.price !== 'number') {
      toast.error("❌ Produto inválido");
      return;
    }

    setCart((prevCart) => {
      const exists = prevCart.find((item) => item._id === product._id);
      if (exists) {
        toast.info(`🛒 ${product.name || 'Produto'} (quantidade aumentada)`);
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        toast.success(`✔️ ${product.name || 'Produto'} adicionado ao carrinho`);
        return [...prevCart, { 
          ...product, 
          qty: 1,
          name: product.name || 'Produto sem nome',
          image: product.image || '/img/sem-imagem.png'
        }];
      }
    });
  }, []);

  // Função para limpar o carrinho
  const clearCart = useCallback(() => {
    setCart([]);
    toast.info("🛒 Carrinho esvaziado");
  }, []);

  // Função para aumentar quantidade
  const increaseQty = useCallback((productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }, []);

  // Função para diminuir quantidade
  const decreaseQty = useCallback((productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === productId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  }, []);

  // Cálculos derivados
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxa = subtotal * 0.03;
  const frete = cart.length > 0 ? 1000 : 0;
  const total = subtotal + taxa + frete;

  // Valor do contexto
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
    subtotal,
    taxa,
    frete,
    total,
    cartCount: cart.reduce((sum, item) => sum + item.qty, 0),
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};