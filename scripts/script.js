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

let addCardButton = document.querySelector('.profile__button_type_add-card');
let addCardOverlay = document.querySelector('#modal-add-new-card');
let addCardNameInput = addCardOverlay.querySelector('.edit-form__input_edit_name');
let addCardSourceInput = addCardOverlay.querySelector('.edit-form__input_edit_img-source');
let closeAddNewCardButton = addCardOverlay.querySelector('.modal-overlay__button_type_close-modal');
let addNewCardForm = addCardOverlay.querySelector('.edit-form');

let editProfileButton = document.querySelector('.profile__button_type_edit-profile');
let editProfileOverlay = document.querySelector('#modal-edit-profile');
let modalOverlayNameInput = editProfileOverlay.querySelector('.edit-form__input_edit_name');
let modalOverlayProfessionInput = editProfileOverlay.querySelector('.edit-form__input_edit_profession');
let closeEditProfileButton = editProfileOverlay.querySelector('.modal-overlay__button_type_close-modal');
let saveProfileSettingForm = editProfileOverlay.querySelector('.edit-form');


let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

let setLike = (button) => () => button.classList.toggle('card-item__button_active');
let removeCard = (card) => () => card.remove();

let addNewCard = (name, link) => {
    let templateCard = document.querySelector('#card-item-template').content;
    let newCard = templateCard.querySelector('.card-item').cloneNode(true);

    let likeButton = newCard.querySelector('.card-item__button_type_set-like');
    likeButton.addEventListener('click', setLike(likeButton));
    let removeButton = newCard.querySelector('.card-item__button_type_remove-card');
    removeButton.addEventListener('click', removeCard(newCard));
    newCard.querySelector('.card-item__name').textContent = name;
    newCard.querySelector('.card-item__image').setAttribute('src', link);
    
    cardsContainer.prepend(newCard);
}

let closeEditProfileModal = () => {
    editProfileOverlay.classList.remove('modal-overlay_open');
}

let closeAddNewCardModal = () => {
    addCardNameInput.value = '';
    addCardSourceInput.value = '';
    addCardOverlay.classList.remove('modal-overlay_open');
}

let openEditProfileModal = () => {
    editProfileOverlay.classList.add('modal-overlay_open');
    modalOverlayNameInput.setAttribute('value', profileName.textContent ?? '');
    modalOverlayProfessionInput.setAttribute('value', profileProfession.textContent ?? '');
}

let openAddNewCardModal = () => {
    addCardOverlay.classList.add('modal-overlay_open');
}

let saveChanges = (event) => {
    event.preventDefault();
    profileName.textContent = modalOverlayNameInput.value;
    profileProfession.textContent = modalOverlayProfessionInput.value;
    closeEditProfileModal();
}

let addNewCardFromModal = (event) => {
    event.preventDefault();
    addNewCard(addCardNameInput.value, addCardSourceInput.value);
    closeAddNewCardModal();
}

initialCards.forEach((cardData) => {
    addNewCard(cardData.name, cardData.link);
});

editProfileButton.addEventListener('click', openEditProfileModal);
addCardButton.addEventListener('click', openAddNewCardModal);

closeEditProfileButton.addEventListener('click', closeEditProfileModal);
closeAddNewCardButton.addEventListener('click', closeAddNewCardModal);

saveProfileSettingForm.addEventListener('submit', saveChanges);
addNewCardForm.addEventListener('submit', addNewCardFromModal);
