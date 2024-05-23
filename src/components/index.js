import '../pages/index.css';
import {createCard, deleteCard, likeCard} from './card.js';
import { openModal, closeModal, closePopupByOverlay } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards, addNewCard, getProfileData, editProfile, editAvatar } from './api.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// Объект с настройками валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// @todo: Вывести карточки на страницу
Promise.all([getProfileData(), getInitialCards()])
  .then(([userData, cardData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;

    cardData.forEach(function(element) {
      placesList.append(createCard(element, deleteCard, likeCard, openImage, userData._id));
    })
  }) 
  .catch((err) => {
    console.log(err);
  })

// Вызов валидации
enableValidation(validationConfig); 

// Закрытие модальных окон
const popups = document.querySelectorAll('.popup');

popups.forEach(function(item) {
  const closeButton = item.querySelector('.popup__close');
  closeButton.addEventListener('click', function() {
    closeModal(item);
  });
  item.addEventListener('click', closePopupByOverlay);
});

// Анимация модальных окон
popups.forEach(function(item) {
  item.classList.add('popup_is-animated');
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
  
  clearValidation(formTypeEdit, validationConfig);
});

// Обработчик «отправки» формы
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  changingButtonText(formTypeEdit, true);

  const newNameInput = nameInput.value;
  const newJobInput = jobInput.value;
  editProfile(newNameInput, newJobInput)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupTypeEdit); 
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changingButtonText(formTypeEdit, false);
    });
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
  clearValidation(formNewCard, validationConfig);
});

// Обработчик формы
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  changingButtonText(formNewCard, true);
  const newCard = {
    name: inputCardName.value,
    link: inputCardUrl.value
  };
  addNewCard(newCard)
    .then((element) => {
      const user = element.owner._id;
      placesList.prepend(createCard(element, deleteCard, likeCard, openImage, user));
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changingButtonText(formNewCard, false);
    });
};

formNewCard.addEventListener('submit', handleFormNewCardSubmit); 

//Редактирование аватарки
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const profileImage = document.querySelector('.profile__image');
const formEditAvatar = popupTypeAvatar.querySelector('.popup__form');
const inputAvatar = document.querySelector('.popup__input_type_avatar');

// Открытие модального окна 
profileImage.addEventListener('click', function() {
  openModal(popupTypeAvatar);
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
});

// Обработчик формы
function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  changingButtonText(formEditAvatar, true);

  const avatarInputValue = inputAvatar.value;
  editAvatar(avatarInputValue)
    .then((newAvatar) => {
      profileImage.style.backgroundImage = `url('${newAvatar}')`;
      closeModal(popupTypeAvatar);
    }) 
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changingButtonText(formEditAvatar, false);
    });
};

formEditAvatar.addEventListener('submit', handleFormAvatarSubmit); 

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

// Изменение текста кнопки пока данные загружаются
function changingButtonText(element, loading) {
  const button = element.querySelector('.popup__button');
  if (loading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent= 'Сохранить';
  }
};