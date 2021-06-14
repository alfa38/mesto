const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

let cardsContainer = document.querySelector('.cards-container');

let modalOverlay = document.querySelector('.modal-overlay');

let modalOverlayNameInput = modalOverlay.querySelector('.edit-form__input_edit_name');
let modalOverlayProfessionInput = modalOverlay.querySelector('.edit-form__input_edit_profession');

let closeModalButton = modalOverlay.querySelector('.modal-overlay__button_type_close-modal');
let editProfileButton = document.querySelector('.profile__button_type_edit-profile');
let saveProfileSettingForm = modalOverlay.querySelector('.edit-form');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

let addNewCard = (name, link) => {
    let templateCard = document.querySelector('#card-item-template').content;
    let newCard = templateCard.querySelector('.card-item').cloneNode(true);

    newCard.querySelector('.card-item__name').textContent = name;
    newCard.querySelector('.card-item__image').setAttribute('src', link);
    
    cardsContainer.append(newCard);
}

let openModal = () => {
    modalOverlay.classList.add('modal-overlay_open');
}

let closeModal = () => {
    modalOverlay.classList.remove('modal-overlay_open');
}

let editProfile = () => {
    openModal();
    modalOverlayNameInput.setAttribute('value', profileName.textContent ?? '');
    modalOverlayProfessionInput.setAttribute('value', profileProfession.textContent ?? '');
}

let saveChanges = (event) => {
    event.preventDefault();
    profileName.textContent = modalOverlayNameInput.value;
    profileProfession.textContent = modalOverlayProfessionInput.value;
    closeModal();
}

initialCards.forEach((cardData) => {
    addNewCard(cardData.name, cardData.link);
});

editProfileButton.addEventListener('click', editProfile);

closeModalButton.addEventListener('click', closeModal);

saveProfileSettingForm.addEventListener('submit', saveChanges);
