import '../pages/index.css';
import { initialCards } from './cards.js'
import {createCard, deleteCard, likeCard} from './card.js';
import { openModal, closeModal } from './modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach(function(element) {
  placesList.append(createCard(element, deleteCard, likeCard, openImage));
});

// Закрытие модальных окон
const popupsClose = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

popupsClose.forEach(function(item) {
  item.addEventListener('click', closeModal);
});

popups.forEach(function(item) {
  item.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup')) {
      closeModal();
    }
  });
});

// Редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const formTypeEdit = popupTypeEdit.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Открытие окна редактирования 
profileEditButton.addEventListener('click', function() {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Обработчик «отправки» формы
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(); 
};

formTypeEdit.addEventListener('submit', handleFormEditSubmit); 

// Добавление карточки
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = popupNewCard.querySelector('.popup__form');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardUrl = document.querySelector('.popup__input_type_url'); 

// Открытие модального окна
profileAddButton.addEventListener('click', function() {
  openModal(popupNewCard);
  formNewCard.reset();
});

// Обработчик формы
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputCardName.value,
    link: inputCardUrl.value
  };
  placesList.prepend(createCard(newCard, deleteCard, likeCard, openImage));
  closeModal(); 
};

formNewCard.addEventListener('submit', handleFormNewCardSubmit); 

// Открытие картинки
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function openImage(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
  openModal(popupTypeImage);
};