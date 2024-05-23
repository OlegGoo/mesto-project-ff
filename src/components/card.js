import { deleteMyCard, addLikeCard, deleteLikeCard } from './api';

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(card, deleteCard, likeCard, openImage, profileId){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeСounter = cardElement.querySelector('.card___like-counter');
  const cardId = card._id;
  
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name; 

  // Иконка удаления только на своих карточках
  if (card.owner._id === profileId) {
    cardDeleteButton.addEventListener('click', function() {
      deleteMyCard(cardId)
        .then(() => {
          deleteCard(cardElement)
        })
        .catch((err) => {
          console.log(err);
        })
    })
  } else {
    cardDeleteButton.remove();
  }

  // Проверка своего лайка
  const myLike = card.likes.some(function(like) {
    return like._id === profileId;
  });
  if (myLike) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  // Счетчик лайков начинается с 1
  if (card.likes.length > 0) {
    cardLikeСounter.textContent = card.likes.length;
  } else {
    cardLikeСounter.textContent = '';
  }

  // Слушатель кнопки лайка
  cardLikeButton.addEventListener('click', function() {
    likeCard(cardId, cardLikeButton, cardLikeСounter);
  });

  // Слушатель нажатия на картинку 
  cardImage.addEventListener('click', function() {
    openImage(card);
  });

  return cardElement;
};

// @todo: Функция удаления карточки
export function deleteCard(item) {
  item.remove();
};

// @todo: Функция лайка карточки
export function likeCard(cardId, cardLikeButton, cardLikeСounter) {
  const likeActive = cardLikeButton.classList.contains('card__like-button_is-active');
  if (likeActive) {
    deleteLikeCard(cardId)
      .then((card) => {
        cardLikeButton.classList.remove('card__like-button_is-active');
        cardLikeСounter.textContent = card.likes.length > 0 ? card.likes.length : '';
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLikeCard(cardId)
      .then((card) => {
        cardLikeButton.classList.add('card__like-button_is-active');
        cardLikeСounter.textContent = card.likes.length > 0 ? card.likes.length : '';
      })
      .catch((err) => {
        console.log(err);
      });
  }; 
};