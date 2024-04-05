// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, deleteCallback){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name; 

  cardDeleteButton.addEventListener('click', function() {
    deleteCallback(cardElement); 
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(item) {
  item.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(element) {
  placesList.append(createCard(element, deleteCard));
});