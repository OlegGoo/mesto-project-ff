// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, deleteCallback){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  let cardImage = cardElement.querySelector('.card__image');
  let cardDeleteButton = cardElement.querySelector('.card__delete-button');
  let cardTitle = cardElement.querySelector('.card__title');
  let cardLikeButton = cardElement.querySelector('.card__like-button');
  
  cardImage.src = card.link;
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