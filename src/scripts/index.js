import { FormValidator } from "./FormValidation.js";
import Card from "./components/Card.js";
import { selectors, initialCards, cardsContainerSelector } from "./constants.js";

import { cardItemSelector} from "./constants.js";
// import { cardsContainer } from "./constants.js";

import { 
    openModal,
    closeModal,
    // photoViewierOverlay,
    //    closePhotoViewierButton
} from "./utils/utils.js";

import Section from "./components/Section.js";
import Modal from "./components/Modal.js";
import PhotoViewierModal from "./components/PhotoViewierModal.js";
import UserInfo from "./components/UserInfo.js";
import ModalWithForm from "./components/ModalWithForm.js";

const addCardOverlay = document.querySelector("#modal-add-new-card");
const addNewCardForm = addCardOverlay.querySelector(".edit-form");
// const addCardNameInput = addCardOverlay.querySelector(".edit-form__input_edit_name");
// const addCardSourceInput = addCardOverlay.querySelector(".edit-form__input_edit_img-source");
// const closeAddNewCardButton = addCardOverlay.querySelector(".modal-overlay__button_type_close-modal");
const addCardButton = document.querySelector(".profile__button_type_add-card");

const editProfileOverlay = document.querySelector("#modal-edit-profile");
// const modalOverlayNameInput = editProfileOverlay.querySelector(".edit-form__input_edit_name");
// const modalOverlayProfessionInput = editProfileOverlay.querySelector(".edit-form__input_edit_profession");
// const closeEditProfileButton = editProfileOverlay.querySelector(".modal-overlay__button_type_close-modal");
const editProfileForm = editProfileOverlay.querySelector(".edit-form");
const editProfileButton = document.querySelector(".profile__button_type_edit-profile");
// const profileName = document.querySelector(".profile__name");
// const profileProfession = document.querySelector(".profile__profession");

const addCardValidator = new FormValidator(selectors, addNewCardForm);
const editProfileValidator = new FormValidator(selectors, editProfileForm);

const handleCardClick = (event, name, link) => {
    event.preventDefault();
    photoViewierModal.openModal({name, link});
};


const rendererFunction = (item) => {
    return new Card(item, cardItemSelector, handleCardClick).createCard();
};

const submitAddNewCard = (event, [name, link]) => {
    event.preventDefault();
    cardSection.addItem(new Card({ name, link }, cardItemSelector, handleCardClick).createCard());
};

const submitEditProfileForm = (event, [name, profession]) => {
    event.preventDefault();
    userInfo.setUserInfo(name, profession);
};

const cardSection = new Section({ items: initialCards, renderer: rendererFunction }, cardsContainerSelector);

const editProfileModal = new ModalWithForm("#modal-edit-profile", submitEditProfileForm);
const addCardModal = new ModalWithForm("#modal-add-new-card", submitAddNewCard);
const photoViewierModal = new PhotoViewierModal("#modal-photo-viewier");

const userInfo = new UserInfo(".profile__name", ".profile__profession");

// photoViewierModal.openModal({name: "hyi", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"});

const initModalControls = () => {
    editProfileModal.setEventListeners();
    addCardModal.setEventListeners();
    photoViewierModal.setEventListeners();


    editProfileButton.addEventListener("click", () => editProfileModal.openModal());
    addCardButton.addEventListener("click", () => addCardModal.openModal());

};


initModalControls();
cardSection.renderItems();

addCardValidator.enableValidation();
editProfileValidator.enableValidation();
