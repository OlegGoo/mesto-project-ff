const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: '68218051-9f1f-41b5-aced-7a8567fb63ae',
    'Content-Type': 'application/json'
  }
};

// Проверка ответа
const response = (res) => {
  if (res.ok) {
    return res.json();
  }
return Promise.reject(`Ошибка: ${res.status}`);
};

// Запрос на получение карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => {
    return response(res);
  })
};

// Добавление новой карточки
export const addNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  })
  .then(res => {
    return response(res);
  })
};

// Удаление карточки
export const deleteMyCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    return response(res);
  })
};

//Постановка и снятие лайка
export const addLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    return response(res);
  })
};

export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    return response(res);
  })
};

// Запрос на получение данных профиля
export const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => {
    return response(res);
  })
};

// Сохранение данных профиля на сервере
export const editProfile = (nameInput, jobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers, 
    body:JSON.stringify({
      name: nameInput,
      about: jobInput
    })
  })
  .then(res => {
    return response(res);
  })
  .then(data => {
    return data;
  })
};

// Обновление аватара пользователя
export const editAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(res => {
    return response(res);
  })
  .then(data => {
    return data.avatar;
  })
};

