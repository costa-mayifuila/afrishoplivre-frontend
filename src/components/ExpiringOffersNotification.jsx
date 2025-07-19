import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ExpiringOffersNotification = () => {
  return (
    <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg shadow-sm flex items-center justify-center gap-3 animate-pulse">
      <FaExclamationTriangle className="text-xl" />
      <span className="text-sm md:text-base font-medium">
        ⚠️ Algumas ofertas estão expirando em breve! Aproveite agora!
      </span>
    </div>
  );
};

export default ExpiringOffersNotification;
