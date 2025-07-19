import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RotaPrivada({ children }) {
  const { usuario, carregando } = useAuth();

  if (carregando) return <div>Carregando...</div>;

  return usuario ? children : <Navigate to="/login" />;
}
