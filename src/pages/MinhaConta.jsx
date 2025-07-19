const User = require('../models/User');

// 📌 Obter meu perfil
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
      success: true,
      message: 'Perfil obtido com sucesso',
      data: user
    });
  } catch (error) {
    console.error('Erro em getMyProfile:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao buscar perfil', error });
  }
};

// 📌 Atualizar meu perfil
const updateMyProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    // Validação simples
    if (email && !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Email inválido' });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      data: user
    });
  } catch (error) {
    console.error('Erro em updateMyProfile:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao atualizar perfil', error });
  }
};

// 📌 Atualizar Token de Notificação Push (FCM)
const updateFCMToken = async (req, res) => {
  try {
    const { fcmToken } = req.body;

    if (!fcmToken) {
      return res.status(400).json({ success: false, message: 'Token de notificação é obrigatório!' });
    }

    await User.findByIdAndUpdate(req.user.id, { fcmToken });

    res.status(200).json({
      success: true,
      message: 'Token de notificação atualizado com sucesso!'
    });
  } catch (error) {
    console.error('Erro em updateFCMToken:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao atualizar token', error });
  }
};

// ✅ Exportação
module.exports = {
  getMyProfile,
  updateMyProfile,
  updateFCMToken,
};
