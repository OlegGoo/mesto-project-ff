// Открытие модального окна
export function openModal(item) {
  item.classList.add('popup_is-animated');
  setTimeout(function(){
    item.classList.add('popup_is-opened');
  }, 50);
  document.addEventListener('keydown', closeModalEsc);
};

// Закрытие модального окна
export function closeModal() {
  const popupIsOpened = document.querySelector('.popup_is-opened');
    popupIsOpened.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
  };

// Закрытие модального окна Ecs
function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
};