import '../pages/index.css';
import { initialCards } from './cards.js'
import {createCard, deleteCard, likeCard} from './card.js';
import { openModal, closeModal, closePopupByOverlay } from './modal.js';
import { enableValidation, clearValidation, validationConfig } from './validation.js';
import { getInitialCards, addNewCard, getProfileData, editProfile, editAvatar } from './api.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

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
  item.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
      closeModal(item);
    }
  });
});

document.addEventListener('click', closePopupByOverlay);

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
  btnSave(formTypeEdit, true);
  const NewNameInput = nameInput.value;
  const NewJobInput = jobInput.value;
  
  editProfile(NewNameInput, NewJobInput)
    .then(() => {
      profileTitle.textContent = NewNameInput;
      profileDescription.textContent = NewJobInput;
      closeModal(popupTypeEdit); 
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      btnSave(formTypeEdit, false);
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
  btnSave(formNewCard, true);
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
      btnSave(formNewCard, false);
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
  btnSave(formEditAvatar, true);
  const avatarInputValue = inputAvatar.value;

  editAvatar(avatarInputValue)
    .then(() => {
      profileImage.style.backgroundImage = `url('${avatarInputValue}')`;
      closeModal(popupTypeAvatar);
    }) 
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      btnSave(formEditAvatar, false);
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
function btnSave(element, loading) {
  const button = element.querySelector('.popup__button');
  if (loading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent= 'Сохранить';
  }
};