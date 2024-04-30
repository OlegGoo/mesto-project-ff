// Открытие модального окна
export function openModal(item) {
  item.classList.add('popup_is-animated');
  setTimeout(function(){
    item.classList.add('popup_is-opened');
  }, 50);
  document.addEventListener('keydown', closeModalEsc);
};

// Закрытие модального окна
export function closeModal(item) {
  item.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
};

// Закрытие модального окна Ecs
function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    closeModal(popupIsOpened);
  }
};

// Закрытие модального окна по оверлею
export function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
};
