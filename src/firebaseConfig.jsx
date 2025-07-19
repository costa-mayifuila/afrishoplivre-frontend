//import { initializeApp } from "firebase/app";
//import { getMessaging, getToken, onMessage } from "firebase/messaging";

//const firebaseConfig = {
  //  apiKey: "AIzaSyD3UPGxv0kJPIg5XBwkgWVaZSK3ZEyz9Hk",
    //authDomain: "afrishoplivre.firebaseapp.com",
    //projectId: "afrishoplivre",
    //storageBucket: "afrishoplivre.firebasestorage.app",
    //messagingSenderId: "972212691185",
    //appId: "1:972212691185:web:68f799b1f860463412c950"
    
//};

// Inicializa o Firebase
//const app = initializeApp(firebaseConfig);
//const messaging = getMessaging(app);

// 📌 Obter Token de Notificação
//export const requestNotificationPermission = async () => {
  //  try {
    //    const token = await getToken(messaging, { vapidKey: "SUA_VAPID_KEY" });
      //  return token;
    //} catch (error) {
      //  console.error("Erro ao obter token de notificação:", error);
        //return null;
   // }
// };

// 📌 Capturar Notificações em Tempo Real
//onMessage(messaging, (payload) => {
  //  console.log("Nova notificação:", payload);
    //alert(payload.notification.title + "\n" + payload.notification.body);
//});
