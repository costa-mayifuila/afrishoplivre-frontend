import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      // Verifica se tem dados válidos
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === "object") {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("user"); // Corrige lixo inválido
        }
      }
    } catch (error) {
      console.error("Erro ao carregar usuário do localStorage:", error);
      localStorage.removeItem("user");
    }
  }, []);

  const login = (userData) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Opcional: limpa token
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
