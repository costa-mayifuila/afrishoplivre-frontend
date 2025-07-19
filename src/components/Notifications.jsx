import React, { useEffect, useState } from "react";
import api from "../api/api";
import { FaBell } from "react-icons/fa";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/notifications");
        setNotifications(res.data);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, status: "lida" } : n))
      );
    } catch (error) {
      console.error("Erro ao marcar como lida:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <FaBell className="text-yellow-500 text-xl" />
        <h2 className="text-lg font-semibold">Notificações</h2>
      </div>

      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={`p-4 rounded-lg border transition-all ${
                notification.status === "lida"
                  ? "bg-gray-100 text-gray-500"
                  : "bg-yellow-50 border-yellow-300"
              }`}
            >
              <p>{notification.message}</p>

              {notification.status === "não lida" && (
                <button
                  onClick={() => markAsRead(notification._id)}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  Marcar como lida
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">Nenhuma notificação no momento.</p>
      )}
    </div>
  );
}
