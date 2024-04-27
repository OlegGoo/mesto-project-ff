const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(card, deleteCard, likeCard, openImage){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name; 

  cardDeleteButton.addEventListener('click', function() {
    deleteCard(cardElement); 
  });

  cardLikeButton.addEventListener('click', function() {
    likeCard(cardLikeButton);
  });

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
export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};