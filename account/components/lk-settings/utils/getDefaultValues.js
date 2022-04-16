export const getDefaultValues = (user) => {
  return {
    name: user.name || 'Введите имя',
    phone: user.phone || 'Введите телефон',
  };
};
